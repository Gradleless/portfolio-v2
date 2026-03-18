import type { BlogPost, BlogPostWithContent } from '$lib/types/blog';

export type Lang = 'fr' | 'en';
export const SUPPORTED_LANGS: Lang[] = ['fr', 'en'];

export function formatDate(date: string, lang: Lang = 'fr'): string {
	const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
	return new Date(date).toLocaleDateString(locale, {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function calculateReadingTime(content: string): number {
	const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
	return Math.ceil(wordCount / 200);
}

const FR_MODULES = import.meta.glob('/src/posts/fr/*.md', { eager: true });
const EN_MODULES = import.meta.glob('/src/posts/en/*.md', { eager: true });
const POST_MODULES: Record<Lang, Record<string, unknown>> = { fr: FR_MODULES, en: EN_MODULES };

// TODO: Better reading time calculation
export async function getAllPosts(lang: Lang = 'fr'): Promise<BlogPost[]> {
	const modules = POST_MODULES[lang];
	const posts: BlogPost[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = path.split('/').pop()?.replace('.md', '') || '';
		const mod = module as any;

		if (mod.metadata?.published) {
			let readingTime = 1;
			try {
				const { render } = await import('svelte/server');
				const Component = mod.default;
				const result = render(Component);
				readingTime = calculateReadingTime(result.body);
			} catch {
				readingTime = 1;
			}

			posts.push({ slug, ...mod.metadata, readingTime });
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function importPostModule(lang: Lang, slug: string) {
	if (lang === 'fr') return await import(`../../posts/fr/${slug}.md`);
	return await import(`../../posts/en/${slug}.md`);
}

export async function postExists(slug: string, lang: Lang): Promise<boolean> {
	try {
		const module = await importPostModule(lang, slug);
		return !!(module as any).metadata?.published;
	} catch {
		return false;
	}
}

export async function getPost(slug: string, lang: Lang = 'fr'): Promise<BlogPostWithContent | null> {
	let module: any;
	let resolvedLang = lang;

	try {
		module = await importPostModule(lang, slug);
	} catch {
		if (lang !== 'fr') {
			try {
				module = await importPostModule('fr', slug);
				resolvedLang = 'fr';
			} catch {
				return null;
			}
		} else {
			return null;
		}
	}

	if (!module.metadata?.published) return null;

	const Component = module.default;
	let content = '';
	try {
		const { render } = await import('svelte/server');
		const result = render(Component);
		content = result.body;
	} catch (renderError) {
		console.error(`Erreur rendu Svelte 5 [${resolvedLang}/${slug}]:`, renderError);
		content = '<p>Contenu non disponible</p>';
	}

	return {
		slug,
		...module.metadata,
		content,
		readingTime: calculateReadingTime(content)
	};
}
