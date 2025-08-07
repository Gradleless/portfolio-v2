import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'html', 'css', 'svelte', 'bash', 'json', 'go']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypeSlug, 
				[rehypeAutolinkHeadings, {
					behavior: 'wrap',
					properties: {
						className: 'heading-link',
						'aria-label': 'Copier le lien vers cette section',
						'data-copy-link': true
					}
				}]
			],
			highlight: {
				highlighter: (code, lang) => {
					return highlighter.codeToHtml(code, {
						lang: lang || 'text',
						theme: 'github-dark'
					});
				}
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;