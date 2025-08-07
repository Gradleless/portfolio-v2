<script lang="ts">
	import type { PageData } from './$types';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import { IconBrandGithub, IconArrowLeft, IconPencil, IconSparkles } from '@tabler/icons-svelte';
	import ArrowRight from '@tabler/icons-svelte/icons/arrow-right';

	let { data }: { data: PageData } = $props();

	// TODO: Make multiple components for the blog
</script>

<svelte:head>
	<title>Blog - Lycia Dufour | Développeuse Web</title>
	<meta name="description" content="Articles sur le développement web, SvelteKit, TypeScript et mes retours d'expérience sur mes projets. Découvrez mes réflexions techniques." />
	<meta name="keywords" content="blog, développement web, SvelteKit, TypeScript, portfolio, JavaScript, tutoriels" />
	<meta name="author" content="Lycia Dufour" />
	<meta name="robots" content="index, follow" />
	
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Blog - Lycia Dufour | Développeuse Web" />
	<meta property="og:description" content="Articles sur le développement web, SvelteKit, TypeScript et mes retours d'expérience." />
	<meta property="og:url" content="https://lycia.anhost.fr/blog" />
	<meta property="og:site_name" content="Blog de Lycia Dufour" />
	
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Blog - Lycia Dufour" />
	<meta name="twitter:description" content="Articles sur le développement web et mes projets" />
	
	<link rel="canonical" href="https://lycia.anhost.fr/blog" />
</svelte:head>

<div class="min-h-screen bg-[#fcf8f0]">
	<nav class="bg-white/90 backdrop- border-b border-blue-200 sticky top-0 z-10">
		<div class="max-w-6xl mx-auto px-5 py-4">
			<a href="/" class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] transition-all duration-300 font-semibold group">
				<IconArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
				Retour au portfolio
			</a>
		</div>
	</nav>

	<header class="bg-gradient-to-br from-[#8aa3ff]/10 to-[#FF88A4]/5 relative overflow-hidden">
		<div class="max-w-6xl mx-auto px-5 py-20 md:py-32 relative z-10">
			<div class="flex flex-col md:flex-row items-center gap-8">
				<div class="flex-1 text-center md:text-left">
					<div class="flex items-center justify-center md:justify-start gap-4 mb-6">
						<div class="relative">
							<IconPencil class="w-12 h-12 text-[#FF88A4] animate-bounce" />
							<IconSparkles class="w-6 h-6 text-[#8aa3ff] absolute -top-2 -right-5" />
						</div>
						<h1 class="text-4xl font-bold text-[#8aa3ff] font-playwrite">
							Mon Blog
						</h1>
					</div>
					
					<p class="text-xl md:text-2xl text-[#555] leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
						Bienvenue dans mon univers ! Vous trouverez ici mes <strong class="text-[#8aa3ff]">réflexions</strong> sur le développement web, mes <strong class="text-[#FF88A4]">découvertes</strong> technologiques et mes retours d'expérience.
					</p>
					
					<div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[#666]">
						<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
							<IconSparkles class="w-4 h-4 text-[#FF88A4]" />
							<span class="font-medium">Développement Web</span>
						</div>
						<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
							<IconSparkles class="w-4 h-4 text-[#8aa3ff]" />
							<span class="font-medium">Retours d'expérience</span>
						</div>
						<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
							<IconSparkles class="w-4 h-4 text-[#FF88A4]" />
							<span class="font-medium">Tutoriels</span>
						</div>
					</div>
				</div>
				
				<div class="flex-shrink-0 hidden md:block">
					<div class="relative">
						<div class="w-64 h-64 rounded-full bg-gradient-to-br from-[#8aa3ff]/20 to-[#FF88A4]/20 flex items-center justify-center">
							<div class="w-48 h-48 rounded-full bg-gradient-to-br from-[#8aa3ff]/10 to-[#FF88A4]/10 flex items-center justify-center">
								<IconPencil class="w-24 h-24 text-[#8aa3ff]" />
							</div>
						</div>
						<div class="absolute -top-4 -left-4 w-8 h-8 bg-[#FF88A4] rounded-full animate-pulse"></div>
						<div class="absolute -bottom-6 -right-2 w-6 h-6 bg-[#8aa3ff] rounded-full animate-pulse" style="animation-delay: 1s;"></div>
						<div class="absolute top-1/2 -right-8 w-4 h-4 bg-[#94b1f5] rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-[#8aa3ff]/5 to-transparent rounded-full"></div>
			<div class="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-[#FF88A4]/5 to-transparent rounded-full"></div>
		</div>
	</header>

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
					Bientôt des articles !
				</h2>
				<p class="text-lg text-[#666] mb-8 max-w-md mx-auto leading-relaxed">
					Je prépare du contenu <strong class="text-[#8aa3ff]">passionnant</strong> pour vous. Revenez bientôt pour découvrir mes articles !
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a href="/" class="inline-flex items-center gap-2 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
						<IconArrowLeft class="w-5 h-5" />
						Voir mon portfolio
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
			
			{#if data.posts.length >= 9}
				<div class="flex justify-center">
					<nav class="flex gap-2" aria-label="Pagination">
						<button class="px-4 py-2 bg-[#8aa3ff] text-white rounded-lg hover:bg-[#7290fd] transition-colors font-medium shadow-md">
							1
						</button>
						<button class="px-4 py-2 bg-white text-[#8aa3ff] border-2 border-[#8aa3ff] rounded-lg hover:bg-blue-50 transition-colors font-medium">
							2
						</button>
						<button class="px-4 py-2 bg-white text-[#8aa3ff] border-2 border-[#8aa3ff] rounded-lg hover:bg-blue-50 transition-colors font-medium">
							3
						</button>
					</nav>
				</div>
			{/if}
		{/if}
	</main>

	<section class="bg-gradient-to-r from-[#8aa3ff]/10 to-[#FF88A4]/10 border-t border-blue-200">
		<div class="max-w-4xl mx-auto px-5 py-16 text-center">
			<h3 class="text-2xl md:text-3xl font-bold text-[#8aa3ff] mb-4 font-playwrite">
				Envie d'échanger ?
			</h3>
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