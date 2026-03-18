<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import SvelteSeo from 'svelte-seo';
	import { IconArrowLeft } from '@tabler/icons-svelte';
	import BlogNav from '$lib/components/BlogNav.svelte';
	import BlogPostHeader from '$lib/components/BlogPostHeader.svelte';
	import BlogContent from '$lib/components/BlogContent.svelte';

	let { data }: { data: PageData } = $props();

	const BASE_URL = 'https://lycia.dev';

	onMount(() => {
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('heading-link') && target.hasAttribute('data-copy-link')) {
				e.preventDefault();
				const href = target.getAttribute('href');
				if (href) {
					const fullUrl = window.location.origin + window.location.pathname + href;
					navigator.clipboard.writeText(fullUrl).then(() => {
						toast.success(data.lang === 'fr' ? 'Lien copié dans le presse-papier !' : 'Link copied to clipboard!');
					});
				}
			}
		});
	});
</script>

<SvelteSeo
	title="{data.post.title} | Blog de Lycia Dufour"
	description={data.post.description}
	keywords={data.post.tags?.join(', ') || ''}
	canonical="{BASE_URL}/{data.lang}/blog/{data.post.slug}"
	openGraph={{
		title: data.post.title,
		description: data.post.description,
		url: `${BASE_URL}/${data.lang}/blog/${data.post.slug}`,
		type: 'article',
		images: data.post.image ? [{ url: `${BASE_URL}${data.post.image}`, alt: data.post.title }] : [],
		site_name: 'Blog de Lycia Dufour',
		article: {
			published_time: data.post.date,
			modified_time: data.post.date,
			author: ['Lycia Dufour'],
			tag: data.post.tags
		}
	}}
	twitter={{
		card: 'summary_large_image',
		title: data.post.title,
		description: data.post.description,
		image: data.post.image ? `${BASE_URL}${data.post.image}` : `${BASE_URL}/og.png`
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: data.post.title,
		description: data.post.description,
		author: { '@type': 'Person', name: 'Lycia Dufour', url: BASE_URL },
		datePublished: data.post.date,
		dateModified: data.post.date,
		keywords: data.post.tags?.join(', '),
		publisher: { '@type': 'Person', name: 'Lycia Dufour' },
		...(data.post.image ? { image: { '@type': 'ImageObject', url: `${BASE_URL}${data.post.image}`, caption: data.post.title } } : {})
	}}
/>

<svelte:head>
	<meta name="author" content="Lycia Dufour" />
	<meta name="robots" content="index, follow" />
	<link rel="alternate" hreflang="fr" href="{BASE_URL}/fr/blog/{data.post.slug}" />
	{#if data.hasTranslation}
		<link rel="alternate" hreflang="en" href="{BASE_URL}/en/blog/{data.post.slug}" />
	{/if}
	<link rel="alternate" hreflang="x-default" href="{BASE_URL}/fr/blog/{data.post.slug}" />
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{ "@type": "ListItem", "position": 1, "name": "Accueil", "item": "${BASE_URL}" },
			{ "@type": "ListItem", "position": 2, "name": "Blog", "item": "${BASE_URL}/${data.lang}/blog" },
			{ "@type": "ListItem", "position": 3, "name": "${data.post.title.replace(/"/g, '\\"')}", "item": "${BASE_URL}/${data.lang}/blog/${data.post.slug}" }
		]
	}
	<\/script>`}
</svelte:head>

<div class="min-h-screen bg-[#fcf8f0]">
	<BlogNav
		href="/{data.lang}/blog"
		label={data.lang === 'fr' ? 'Retour au blog' : 'Back to blog'}
		narrow
		lang={data.lang}
		altHref={data.lang === 'fr'
			? (data.hasTranslation ? `/en/blog/${data.post.slug}` : '/en/blog')
			: (data.hasTranslation ? `/fr/blog/${data.post.slug}` : '/fr/blog')}
	/>
	<BlogPostHeader post={data.post} lang={data.lang} />

	<main class="max-w-4xl mx-auto px-5 py-12">
		<BlogContent content={data.post.content} image={data.post.image} imageAlt={data.post.title} />

		<div class="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
			<a href="/{data.lang}/blog" class="group inline-flex items-center gap-3 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
				<IconArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
				{data.lang === 'fr' ? 'Tous les articles' : 'All posts'}
			</a>
			<a href="/#contact" class="group inline-flex items-center gap-3 bg-white border-2 border-[#FF88A4] text-[#FF88A4] hover:bg-[#FF88A4] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
				{data.lang === 'fr' ? 'Me contacter' : 'Contact me'}
				<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
				</svg>
			</a>
		</div>
	</main>
</div>
