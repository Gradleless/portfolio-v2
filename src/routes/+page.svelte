<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';
	import Education from '$lib/components/Education.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Sidebar from '$lib/components/Aside.svelte';
	import { portfolioData } from '$lib/stores/portfolio';
	import BlogPreview from '$lib/components/BlogPreview.svelte';
	import SvelteSeo from 'svelte-seo';

	let { data }: { data: PageData } = $props();
</script>

<SvelteSeo
	title="Lycia Dufour — Développeuse Web Freelance"
	description="Portfolio de Lycia Dufour, développeuse web fullstack freelance. SvelteKit, TypeScript, React, Go. Découvrez mes projets et prenez contact pour votre prochain projet web."
	keywords="portfolio, Lycia Dufour, développeuse web, freelance, SvelteKit, TypeScript, React, fullstack, Lille"
	canonical="https://lycia.dev"
	openGraph={{
		title: 'Lycia Dufour — Développeuse Web Freelance',
		description: 'Portfolio de la développeuse web dont vous aurez bientôt besoin',
		url: 'https://lycia.dev',
		type: 'website',
		images: [{ url: 'https://lycia.dev/og.png', alt: 'Portfolio de Lycia Dufour' }],
		site_name: 'Portfolio de Lycia Dufour'
	}}
	twitter={{
		card: 'summary_large_image',
		title: 'Lycia Dufour — Développeuse Web Freelance',
		description: 'Portfolio de la développeuse web dont vous aurez bientôt besoin',
		image: 'https://lycia.dev/og.png'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Lycia Dufour',
		url: 'https://lycia.dev',
		jobTitle: 'Développeuse Web Freelance',
		image: 'https://lycia.dev/og.png',
		email: 'lycia.dufour@gmail.com',
		sameAs: [
			'https://github.com/gradleless',
			'https://fr.linkedin.com/in/lycia-dufour-3ab8302b3'
		]
	}}
/>

<svelte:head>
	<meta name="author" content="Lycia Dufour" />
	<link rel="icon" type="image/png" href="/sparkle.svg" />
</svelte:head>
<main class="min-h-screen bg-[#fcf8f0] max-md:py-24 md:pt-32">
	<Header />

	<section class="xl:flex gap-16">
		<div class="bg-white py-24 lg:px-24 px-5">
			<About data={portfolioData} />
			<div class="lg:grid lg:grid-cols-2 gap-5 lg:gap-16">
				<Education data={portfolioData} />
				<Experience data={portfolioData.experiences} />
			</div>

			<BlogPreview posts={data.latestPosts} />
		</div>
		<Sidebar data={portfolioData} />
	</section>
</main>
