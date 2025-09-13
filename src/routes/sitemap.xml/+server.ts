import { getAllPosts } from '$lib/utils/blog';

export const prerender = true;
const website = 'https://lycia.dev';

export async function GET() {
	const posts = await getAllPosts();
	
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${website}</loc>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
		<lastmod>${new Date().toISOString()}</lastmod>
	</url>
	<url>
		<loc>${website}/blog</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		<lastmod>${new Date().toISOString()}</lastmod>
	</url>
	${posts
		.map(
			(post) => `
	<url>
		<loc>${website}/blog/${post.slug}</loc>
		<changefreq>monthly</changefreq>
		<priority>0.7</priority>
		<lastmod>${new Date(post.date).toISOString()}</lastmod>
	</url>`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}