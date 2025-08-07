import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPost } from '$lib/utils/blog';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	
	if (!slug || /\.(png|jpg|jpeg|gif|webp|svg|pdf|mp4|mov)$/i.test(slug)) {
		throw error(404, 'Ressource non trouvée');
	}
	
	if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
		throw error(404, 'Slug invalide');
	}
	
	const post = await getPost(slug);
	
	if (!post) {
		throw error(404, 'Article non trouvé');
	}
	
	return { post };
};