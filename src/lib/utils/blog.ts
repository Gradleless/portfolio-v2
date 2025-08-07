import type { BlogPost, BlogPostWithContent } from '$lib/types/blog';

export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function calculateReadingTime(content: string): number {
	const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
	return Math.ceil(wordCount / 200);
}

// TODO: Better reading time calculation
export async function getAllPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });
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
				console.log(`Reading time for ${slug}:`, readingTime);
			} catch (error) {
				console.warn(`Failed to calculate reading time for ${slug}:`, error);
				readingTime = 1;
			}
			
			const post = {
				slug,
				...mod.metadata,
				readingTime
			};
			console.log(`Final post object for ${slug}:`, post);
			posts.push(post);
		}
	}	

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<BlogPostWithContent | null> {
	try {
		const module = await import(`../../posts/${slug}.md`);
		
		if (!module.metadata?.published) {
			return null;
		}

		const Component = module.default;
		let content = '';

		try {
			const { render } = await import('svelte/server');
			const result = render(Component);
			content = result.body;
		} catch (renderError) {
			console.error('Erreur rendu Svelte 5:', renderError);
			content = '<p>Contenu non disponible</p>';
		}

		return {
			slug,
			...module.metadata,
			content,
			readingTime: calculateReadingTime(content)
		};
	} catch (error) {
		console.error(`Erreur chargement post ${slug}:`, error);
		return null;
	}
}