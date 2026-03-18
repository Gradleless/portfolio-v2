import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPost, postExists, SUPPORTED_LANGS, type Lang } from '$lib/utils/blog';

export const load: PageServerLoad = async ({ params }) => {
	const lang = params.lang as Lang;
	const slug = params.slug;

	if (!SUPPORTED_LANGS.includes(lang)) throw error(404);
	if (!slug || /\.(png|jpg|jpeg|gif|webp|svg|pdf|mp4|mov)$/i.test(slug)) {
		throw error(404, 'Ressource non trouvée');
	}
	if (!/^[a-zA-Z0-9-]+$/.test(slug)) throw error(404, 'Slug invalide');

	const post = await getPost(slug, lang);
	if (!post) throw error(404, 'Article non trouvé');

	const otherLang: Lang = lang === 'fr' ? 'en' : 'fr';
	const hasTranslation = await postExists(slug, otherLang);

	return { post, lang, hasTranslation };
};
