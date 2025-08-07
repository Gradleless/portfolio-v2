import type { PageLoad } from './$types';
import { getAllPosts } from '$lib/utils/blog';

export const load: PageLoad = async () => {
	try {
		const posts = await getAllPosts();
		return {
			posts
		};
	} catch (error) {
		console.error('Erreur lors du chargement des articles:', error);
		return {
			posts: []
		};
	}
};