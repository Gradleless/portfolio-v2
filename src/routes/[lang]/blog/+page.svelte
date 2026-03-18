<script lang="ts">
	import type { PageData } from './$types';
	import SvelteSeo from 'svelte-seo';
	import { IconBrandGithub, IconPencil } from '@tabler/icons-svelte';
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import BlogNav from '$lib/components/BlogNav.svelte';
	import BlogHero from '$lib/components/BlogHero.svelte';
	import BlogPagination from '$lib/components/BlogPagination.svelte';

	let { data }: { data: PageData } = $props();

	const BASE_URL = 'https://lycia.dev';
</script>

<SvelteSeo
	title={data.lang === 'fr' ? 'Blog — Lycia Dufour | Développeuse Web' : 'Blog — Lycia Dufour | Web Developer'}
	description={data.lang === 'fr'
		? "Articles sur le développement web, SvelteKit, TypeScript et mes retours d'expérience sur mes projets."
		: 'Articles about web development, SvelteKit, TypeScript and my project experiences.'}
	keywords={data.lang === 'fr'
		? 'blog, développement web, SvelteKit, TypeScript, portfolio, JavaScript, tutoriels'
		: 'blog, web development, SvelteKit, TypeScript, portfolio, JavaScript, tutorials'}
	canonical="{BASE_URL}/{data.lang}/blog"
	openGraph={{
		title: data.lang === 'fr' ? 'Blog — Lycia Dufour | Développeuse Web' : 'Blog — Lycia Dufour | Web Developer',
		description: data.lang === 'fr'
			? "Articles sur le développement web, SvelteKit, TypeScript et mes retours d'expérience."
			: 'Articles about web development, SvelteKit, TypeScript and my project experiences.',
		url: `${BASE_URL}/${data.lang}/blog`,
		type: 'website',
		images: [{ url: `${BASE_URL}/og.png`, alt: 'Blog de Lycia Dufour' }],
		site_name: 'Blog de Lycia Dufour'
	}}
	twitter={{
		card: 'summary_large_image',
		title: data.lang === 'fr' ? 'Blog — Lycia Dufour | Développeuse Web' : 'Blog — Lycia Dufour | Web Developer',
		description: data.lang === 'fr' ? 'Articles sur le développement web et mes projets' : 'Articles about web development and my projects',
		image: `${BASE_URL}/og.png`
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/${data.lang}/blog` }
		]
	}}
/>

<svelte:head>
	<meta name="author" content="Lycia Dufour" />
	<meta name="robots" content="index, follow" />
	<link rel="alternate" hreflang="fr" href="{BASE_URL}/fr/blog" />
	<link rel="alternate" hreflang="en" href="{BASE_URL}/en/blog" />
	<link rel="alternate" hreflang="x-default" href="{BASE_URL}/fr/blog" />
</svelte:head>

<div class="min-h-screen bg-[#fcf8f0]">
	<BlogNav
		href="/"
		label={data.lang === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}
		lang={data.lang}
		altHref={data.lang === 'fr' ? '/en/blog' : '/fr/blog'}
	/>
	<BlogHero lang={data.lang} />

	<main class="max-w-6xl mx-auto px-5 py-16">
		{#if data.posts.length === 0}
			<div class="text-center py-20">
				<div class="relative mx-auto w-32 h-32 mb-8">
					<div class="w-32 h-32 bg-gradient-to-br from-blue-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg">
						<IconPencil class="w-16 h-16 text-[#8aa3ff]" />
					</div>
					<div class="absolute -top-2 -right-2 w-8 h-8 bg-[#FF88A4] rounded-full flex items-center justify-center shadow-md">
						<span class="text-white font-bold text-sm">!</span>
					</div>
				</div>
				<h2 class="text-3xl font-bold text-[#8aa3ff] mb-6 font-playwrite">
					{data.lang === 'fr' ? 'Bientôt des articles !' : 'Coming soon!'}
				</h2>
				<p class="text-lg text-[#666] mb-8 max-w-md mx-auto leading-relaxed">
					{#if data.lang === 'fr'}
						Je prépare du contenu <strong class="text-[#8aa3ff]">passionnant</strong> pour vous. Revenez bientôt pour découvrir mes articles !
					{:else}
						I'm preparing <strong class="text-[#8aa3ff]">exciting</strong> content for you. Check back soon!
					{/if}
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a href="/" class="inline-flex items-center gap-2 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
						{data.lang === 'fr' ? '← Voir mon portfolio' : '← View my portfolio'}
					</a>
					<a href="/#contact" class="inline-flex items-center gap-2 border-2 border-[#FF88A4] text-[#FF88A4] hover:bg-[#FF88A4] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
						{data.lang === 'fr' ? 'Me contacter' : 'Contact me'}
						<ArrowRight class="w-5 h-5" />
					</a>
				</div>
			</div>
		{:else}
			<div class="mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-[#8aa3ff] mb-4 font-playwrite text-center md:text-left">
					{data.lang === 'fr' ? 'Articles récents' : 'Recent posts'}
				</h2>
				<p class="text-lg text-[#666] mb-12 text-center md:text-left max-w-2xl">
					{#if data.lang === 'fr'}
						Découvrez mes derniers articles sur le développement web, mes projets et mes réflexions techniques.
					{:else}
						My latest articles on web development, projects and technical insights.
					{/if}
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3 mb-16">
				{#each data.posts as post}
					<div class="group">
						<BlogCard {post} lang={data.lang} />
					</div>
				{/each}
			</div>

			<BlogPagination pagination={data.pagination} />
		{/if}
	</main>

	<section class="bg-gradient-to-r from-[#8aa3ff]/10 to-[#FF88A4]/10 border-t border-blue-200">
		<div class="max-w-4xl mx-auto px-5 py-16 text-center">
			<h3 class="text-2xl md:text-3xl font-bold text-[#8aa3ff] mb-4 font-playwrite">
				{data.lang === 'fr' ? 'Envie d\'échanger ?' : 'Want to connect?'}
			</h3>
			<p class="text-lg text-[#666] mb-8 max-w-2xl mx-auto">
				{#if data.lang === 'fr'}
					N'hésitez pas à me contacter si mes articles vous inspirent ou si vous avez des questions !
				{:else}
					Feel free to reach out if my articles inspire you or if you have any questions!
				{/if}
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a href="/#contact" class="inline-flex items-center gap-2 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
					{data.lang === 'fr' ? 'Me contacter' : 'Contact me'}
					<ArrowRight class="w-5 h-5" />
				</a>
				<a href="https://github.com/gradleless" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border-2 border-[#FF88A4] text-[#FF88A4] hover:bg-[#FF88A4] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
					GitHub
					<IconBrandGithub class="w-5 h-5" />
				</a>
			</div>
		</div>
	</section>
</div>
