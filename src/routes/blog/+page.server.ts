import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/utils/blog';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const page = parseInt(url.searchParams.get('page') || '1');
		const postsPerPage = 6;
		
		const allPosts = await getAllPosts();
		const totalPages = Math.ceil(allPosts.length / postsPerPage);
		
		const startIndex = (page - 1) * postsPerPage;
		const posts = allPosts.slice(startIndex, startIndex + postsPerPage);
		
		return {
			posts,
			pagination: {
				currentPage: page,
				totalPages,
				totalPosts: allPosts.length,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1
			}
		};
	} catch (error) {
		console.error('Erreur lors du chargement des articles:', error);
		return {
			posts: [],
			pagination: {
				currentPage: 1,
				totalPages: 0,
				totalPosts: 0,
				hasNextPage: false,
				hasPrevPage: false
			}
		};
	}
};