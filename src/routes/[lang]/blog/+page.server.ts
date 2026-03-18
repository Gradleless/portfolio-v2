import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllPosts, SUPPORTED_LANGS, type Lang } from '$lib/utils/blog';

export const load: PageServerLoad = async ({ params, url }) => {
	const lang = params.lang as Lang;
	if (!SUPPORTED_LANGS.includes(lang)) throw error(404);

	const page = parseInt(url.searchParams.get('page') || '1');
	const postsPerPage = 6;

	const allPosts = await getAllPosts(lang);
	const totalPages = Math.ceil(allPosts.length / postsPerPage);
	const startIndex = (page - 1) * postsPerPage;
	const posts = allPosts.slice(startIndex, startIndex + postsPerPage);

	return {
		lang,
		posts,
		pagination: {
			currentPage: page,
			totalPages,
			totalPosts: allPosts.length,
			hasNextPage: page < totalPages,
			hasPrevPage: page > 1
		}
	};
};
