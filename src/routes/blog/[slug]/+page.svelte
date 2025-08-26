<script lang="ts">
	import type { PageData } from './$types';
	import { formatDate } from '$lib/utils/blog';
	import { IconArrowLeft, IconCalendar, IconClock, IconTag } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { data }: { data: PageData } = $props();
	const { post } = data;

	onMount(() => {
		// TODO: Make a better copy link system, check if rehypeAutoLink doesn't have a better solution
		document.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('heading-link') && target.hasAttribute('data-copy-link')) {
				e.preventDefault();
				const href = target.getAttribute('href');
				if (href) {
					const fullUrl = window.location.origin + window.location.pathname + href;
					navigator.clipboard.writeText(fullUrl).then(() => {
						toast.success('Lien copié dans le presse-papier !');
					});
				}
			}
		});
	});

	// TODO: Make multiple components for the blog
</script>

<svelte:head>
	<title>{post.title} - Blog de Lycia</title>
	<meta name="description" content={post.description} />
	<meta name="keywords" content={post.tags?.join(', ') || ''} />
	<meta name="author" content="Lycia Dufour" />
	<meta name="robots" content="index, follow" />
	
	<meta property="og:title" content="{post.title} - Blog de Lycia" />
	<meta property="og:description" content={post.description} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://lycia.anhost.fr/blog/{post.slug}" />
	{#if post.image}
		<meta property="og:image" content="https://lycia.anhost.fr{post.image}" />
	{/if}
</svelte:head>

<div class="min-h-screen bg-[#fcf8f0]">
	<nav class="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10">
		<div class="max-w-4xl mx-auto px-5 py-4">
			<a href="/blog" class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] transition-all duration-300 font-semibold group">
				<IconArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
				Retour au blog
			</a>
		</div>
	</nav>

	<header class="bg-gradient-to-br from-[#8aa3ff]/5 to-[#FF88A4]/5 border-b border-blue-100">
		<div class="max-w-4xl mx-auto px-5 py-16 md:py-24">			
			<h1 class="text-3xl md:leading-[3.5rem] leading-[3rem] md:text-4xl font-bold text-[#8aa3ff] font-playwrite mb-6">
				{post.title}
			</h1>
			
			<p class="text-lg md:text-xl text-[#555] mb-8 leading-relaxed max-w-3xl">
				{post.description}
			</p>
			
			<div class="flex flex-wrap items-center gap-1 md:gap-6  text-[#666] mb-8">
				<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
					<IconCalendar class="w-5 h-5 text-[#FF88A4]" />
					<span class="font-medium">{formatDate(post.date)}</span>
				</div>
				
				{#if post.readingTime}
					<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
						<IconClock class="w-5 h-5 text-[#FF88A4]" />
						<span class="font-medium">{post.readingTime} min de lecture</span>
					</div>
				{/if}
			</div>
			
			{#if post.tags?.length > 0}
				<div class="flex md:flex-row flex-col items-start gap-3 mb-8">
					<div class="flex items-center gap-2 text-[#8aa3ff] font-medium mt-1">
						<IconTag class="w-4 h-4" />
						<span class="text-sm">Tags:</span>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each post.tags as tag}
							<span class="inline-block bg-white/90 backdrop-blur-sm border-2 border-[#8aa3ff]/30 text-[#8aa3ff] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#8aa3ff] hover:text-white hover:scale-105 transition-all duration-300 cursor-default shadow-sm">
								#{tag}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-5 py-12">
		<article class="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
			{#if post.image}
				<div class="aspect-video md:aspect-[2/1] overflow-hidden">
					<img 
						src={post.image} 
						alt={post.title} 
						class="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
					/>
				</div>
			{/if}
			

			<div class="p-8 md:p-12 lg:p-16">

				<!-- TODO: Better handling of the css classes for the blog, it's a mess lmao -->
				<div class="prose prose-lg prose-slate max-w-none blog-reading
							prose-headings:font-playwrite prose-headings:text-[#8aa3ff] prose-headings:scroll-mt-20
							prose-h1:text-3xl prose-h1:leading-[3rem] prose-h1:mb-8 prose-h1:border-b prose-h1:border-blue-200 prose-h1:pb-4
							prose-h2:text-2xl prose-h2:leading-10 prose-h2:mb-6 prose-h2:mt-12 prose-h2:border-l-4 prose-h2:border-[#94b1f5] prose-h2:md:px-6 prose-h2:px-2 prose-h2:py-3 prose-h2:bg-blue-50/50 prose-h2:rounded-r-lg
							prose-h3:text-xl prose-h3:leading-10 prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-[#666] prose-h3:border-b prose-h3:border-gray-200 prose-h3:pb-2
							prose-h4:text-lg prose-h4:leading-10 prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-[#777] prose-h4:font-semibold
							prose-p:text-[#333] prose-p:mb-8 prose-p:text-base
							prose-a:text-[#FF88A4] prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#e570a0] prose-a:transition-colors
							prose-strong:text-[#8aa3ff] prose-strong:font-semibold
							prose-em:text-[#555] prose-em:italic
							prose-code:bg-blue-50 prose-code:text-[#8aa3ff] prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
							prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700 prose-pre:shadow-lg
							prose-pre:code:bg-transparent prose-pre:code:text-slate-100 prose-pre:code:p-0
							prose-blockquote:border-l-4 prose-blockquote:border-[#FF88A4] prose-blockquote:bg-gradient-to-r prose-blockquote:from-pink-50 prose-blockquote:to-transparent prose-blockquote:rounded-r-lg prose-blockquote:p-2 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-[#555]
							prose-ul:my-8 prose-ol:my-8
							prose-li:text-[#333] prose-li:mb-3
							prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-200 prose-img:my-8
							prose-table:my-8 prose-table:shadow-lg prose-table:rounded-lg prose-table:overflow-hidden
							prose-th:bg-[#8aa3ff] prose-th:text-white prose-th:font-semibold prose-th:p-4
							prose-td:p-4 prose-td:border-b prose-td:border-gray-200
							prose-hr:my-12 prose-hr:border-blue-200">
					
					{@html post.content}
				</div>
			</div>
		</article>
		
		<div class="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
			<a href="/blog" class="group inline-flex items-center gap-3 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
				<IconArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
				Tous les articles
			</a>
			
			<a href="/#contact" class="group inline-flex items-center gap-3 bg-white border-2 border-[#FF88A4] text-[#FF88A4] hover:bg-[#FF88A4] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
				Me contacter
				<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
				</svg>
			</a>
		</div>
	</main>
</div>

<style>
	:global(.blog-reading.prose p) {
		line-height: 2.0 !important;
	}
	
	:global(.blog-reading.prose li) {
		line-height: 1.8 !important;
	}
	
	:global(.blog-reading.prose blockquote) {
		line-height: 1.8 !important;
	}
	
	:global(.prose.prose-lg.prose-slate p) {
		line-height: 2.0 !important;
	}
	
	:global(.prose.prose-lg.prose-slate li) {
		line-height: 1.8 !important;
	}

	:global(.heading-link) {
		text-decoration: none !important;
		cursor: pointer;
		color: inherit;
		transition: text-decoration 0.2s;
	}

	:global(.heading-link:hover) {
		color: inherit;
		text-decoration: underline !important;
	}

	:global(.hljs) {
		box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05) !important;
		overflow-x: auto !important;
		font-size: 0.875rem !important;
		line-height: 1.5 !important;
	}

	:global(.prose pre) {
		background: #282c34 !important;
		border-radius: 0.75rem !important;
		box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05) !important;
		border: 1px solid rgba(148, 177, 245, 0.2) !important;
		overflow-x: auto !important;
	}

	:global(.prose pre code) {
		background: transparent !important;
		color: #abb2bf !important;
		padding: 0 !important;
		font-size: 0.875rem !important;
		line-height: 1.5 !important;
	}

	:global(.prose code:not(pre code)) {
		background: #eff6ff !important;
		color: #8aa3ff !important;
		border-radius: 0.375rem !important;
		font-family: ui-monospace, SFMono-Regular, 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
		font-size: 0.875rem !important;
		font-weight: 500 !important;
	}
</style>