import type { PageServerLoad } from './$types';
import { getAllPosts } from '$lib/utils/blog';

export const load: PageServerLoad = async () => {
	const allPosts = await getAllPosts();
	return {
		latestPosts: allPosts.slice(0, 3)
	};
};
