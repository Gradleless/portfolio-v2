import { getAllPosts, SUPPORTED_LANGS } from '$lib/utils/blog';

export const prerender = true;

const BASE_URL = 'https://lycia.dev';

function urlEntry(loc: string, priority: number, changefreq: string, lastmod: string) {
	return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`;
}

export async function GET() {
	const buildDate = new Date().toISOString();

	const postsByLang = await Promise.all(
		SUPPORTED_LANGS.map(async (lang) => ({ lang, posts: await getAllPosts(lang) }))
	);

	const urls = [
		urlEntry(BASE_URL, 1.0, 'monthly', buildDate),
		...SUPPORTED_LANGS.map((lang) =>
			urlEntry(`${BASE_URL}/${lang}/blog`, 0.8, 'weekly', buildDate)
		),
		...postsByLang.flatMap(({ lang, posts }) =>
			posts.map((post) =>
				urlEntry(`${BASE_URL}/${lang}/blog/${post.slug}`, 0.7, 'monthly', new Date(post.date).toISOString())
			)
		)
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
