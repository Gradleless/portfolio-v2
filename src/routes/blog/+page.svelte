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
</script>

<SvelteSeo
	title="Blog — Lycia Dufour | Développeuse Web"
	description="Articles sur le développement web, SvelteKit, TypeScript et mes retours d'expérience sur mes projets. Découvrez mes réflexions techniques."
	keywords="blog, développement web, SvelteKit, TypeScript, portfolio, JavaScript, tutoriels"
	canonical="https://lycia.dev/blog"
	openGraph={{
		title: 'Blog — Lycia Dufour | Développeuse Web',
		description: "Articles sur le développement web, SvelteKit, TypeScript et mes retours d'expérience.",
		url: 'https://lycia.dev/blog',
		type: 'website',
		images: [{ url: 'https://lycia.dev/og.png', alt: 'Blog de Lycia Dufour' }],
		site_name: 'Blog de Lycia Dufour'
	}}
	twitter={{
		card: 'summary_large_image',
		title: 'Blog — Lycia Dufour | Développeuse Web',
		description: 'Articles sur le développement web et mes projets',
		image: 'https://lycia.dev/og.png'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://lycia.dev' },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://lycia.dev/blog' }
		]
	}}
/>

<svelte:head>
	<meta name="author" content="Lycia Dufour" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<div class="min-h-screen bg-[#fcf8f0]">
	<BlogNav href="/" label="Retour au portfolio" />
	<BlogHero />

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
				<h2 class="text-3xl font-bold text-[#8aa3ff] mb-6 font-playwrite">Bientôt des articles !</h2>
				<p class="text-lg text-[#666] mb-8 max-w-md mx-auto leading-relaxed">
					Je prépare du contenu <strong class="text-[#8aa3ff]">passionnant</strong> pour vous. Revenez bientôt pour découvrir mes articles !
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a href="/" class="inline-flex items-center gap-2 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
						← Voir mon portfolio
					</a>
					<a href="/#contact" class="inline-flex items-center gap-2 border-2 border-[#FF88A4] text-[#FF88A4] hover:bg-[#FF88A4] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
						Me contacter
						<ArrowRight class="w-5 h-5" />
					</a>
				</div>
			</div>
		{:else}
			<div class="mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-[#8aa3ff] mb-4 font-playwrite text-center md:text-left">
					Articles récents
				</h2>
				<p class="text-lg text-[#666] mb-12 text-center md:text-left max-w-2xl">
					Découvrez mes derniers articles sur le développement web, mes projets et mes réflexions techniques.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3 mb-16">
				{#each data.posts as post}
					<div class="group">
						<BlogCard {post} />
					</div>
				{/each}
			</div>

			<BlogPagination pagination={data.pagination} />
		{/if}
	</main>

	<section class="bg-gradient-to-r from-[#8aa3ff]/10 to-[#FF88A4]/10 border-t border-blue-200">
		<div class="max-w-4xl mx-auto px-5 py-16 text-center">
			<h3 class="text-2xl md:text-3xl font-bold text-[#8aa3ff] mb-4 font-playwrite">Envie d'échanger ?</h3>
			<p class="text-lg text-[#666] mb-8 max-w-2xl mx-auto">
				N'hésitez pas à me contacter si mes articles vous inspirent ou si vous avez des questions !
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a href="/#contact" class="inline-flex items-center gap-2 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
					Me contacter
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
