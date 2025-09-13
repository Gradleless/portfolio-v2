<script lang="ts">
	import { formatDate } from '$lib/utils/blog';
	import { IconArrowLeft, IconCalendar, IconClock } from '@tabler/icons-svelte';

	let { title, description, date, tags = [], readingTime, image } = $props();
</script>

<svelte:head>
	<title>{title} - Blog de Lycia</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={tags.join(', ')} />
	<meta name="author" content="Lycia Dufour" />
	<meta name="robots" content="index, follow" />
	
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="Blog de Lycia Dufour" />
	<meta property="article:author" content="Lycia Dufour" />
	<meta property="article:published_time" content={date} />
	{#each tags as tag}
		<meta property="article:tag" content={tag} />
	{/each}
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="og:image:alt" content={title} />
	{/if}
	
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}
	
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"headline": "${title}",
		"description": "${description}",
		"author": {
			"@type": "Person",
			"name": "Lycia Dufour",
			"url": "https://lycia.dev"
		},
		"datePublished": "${date}",
		"dateModified": "${date}",
		"keywords": "${tags.join(', ')}",
		"publisher": {
			"@type": "Person",
			"name": "Lycia Dufour"
		}${image ? `,
		"image": {
			"@type": "ImageObject",
			"url": "${image}",
			"caption": "${title}"
		}` : ''}
	}
	</script>`}
</svelte:head>

<div class="min-h-screen bg-[#fcf8f0]">
	<header class="bg-white border-b border-blue-200">
		<div class="max-w-4xl mx-auto px-5 py-8">
			<a href="/blog" class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] transition-colors mb-6 font-semibold">
				<IconArrowLeft class="w-5 h-5" />
				Retour au blog
			</a>
			
			<h1 class="text-3xl md:text-5xl font-bold text-[#8aa3ff] font-playwrite mb-4">
				{title}
			</h1>
			
			<p class="text-xl text-[#333333] mb-6 leading-relaxed">
				{description}
			</p>
			
			<div class="flex flex-wrap items-center gap-4 text-[#666] mb-6">
				<div class="flex items-center gap-2">
					<IconCalendar class="w-5 h-5 text-[#FF88A4]" />
					<span>{formatDate(date)}</span>
				</div>
				
				{#if readingTime}
					<div class="flex items-center gap-2">
						<IconClock class="w-5 h-5 text-[#FF88A4]" />
						<span>{readingTime} min de lecture</span>
					</div>
				{/if}
			</div>
			
			{#if tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each tags as tag}
						<span class="border-2 font-semibold text-blue-400 border-[#8aa3ff] px-3 py-1 rounded-full text-sm">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-5 py-12">
		<article class="bg-white rounded-lg shadow-sm p-8 md:p-12">
			{#if image}
				<img src={image} alt={title} class="w-full h-64 md:h-80 object-cover rounded-lg mb-8" />
			{/if}
			
			<div class="prose prose-lg max-w-none prose-blue prose-headings:text-[#8aa3ff] prose-headings:font-semibold prose-a:text-[#FF88A4] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#8aa3ff] prose-code:bg-blue-50 prose-code:text-[#8aa3ff] prose-code:px-2 prose-code:py-1 prose-code:rounded">
				<slot />
			</div>
		</article>
		
		<div class="mt-12 text-center">
			<a href="/blog" class="inline-flex items-center gap-2 bg-[#8aa3ff] hover:bg-[#7290fd] text-white px-6 py-3 rounded-full font-semibold transition-colors">
				<IconArrowLeft class="w-5 h-5" />
				Voir tous les articles
			</a>
		</div>
	</main>
</div>

<style>
	:global(.prose h1) {
		@apply font-playwrite;
	}
	
	:global(.prose h2) {
		@apply border-l-4 border-[#94b1f5] pl-4 font-playwrite;
	}
	
	:global(.prose blockquote) {
		@apply border-l-4 border-[#FF88A4] bg-pink-50 p-4 rounded-r-lg;
	}
</style>