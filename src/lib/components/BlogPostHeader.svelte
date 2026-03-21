<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import { formatDate, type Lang } from '$lib/utils/blog';
	import { IconCalendar, IconClock, IconTag } from '@tabler/icons-svelte';

	let { post, lang = 'fr' }: { post: BlogPost; lang: Lang } = $props();
</script>

<header class="bg-gradient-to-br from-[#8aa3ff]/5 to-[#FF88A4]/5 border-b border-blue-100">
	<div class="max-w-4xl mx-auto px-5 py-16 md:py-24">
		<h1 class="text-3xl md:leading-[3.5rem] leading-[3rem] md:text-4xl font-bold text-[#8aa3ff] font-playwrite mb-6">
			{@html post.title.replace(/`([^`]+)`/g, '<code class="font-mono bg-[#8aa3ff]/10 px-2 py-1 rounded text-2xl md:text-3xl mx-1">$1</code>')}
		</h1>

		<p class="text-lg md:text-xl text-[#555] mb-8 leading-relaxed max-w-3xl">
			{post.description}
		</p>

		<div class="flex flex-wrap items-center gap-1 md:gap-6 text-[#666] mb-8">
			<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
				<IconCalendar class="w-5 h-5 text-[#FF88A4]" />
				<span class="font-medium">{formatDate(post.date, lang)}</span>
			</div>

			{#if post.readingTime}
				<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
					<IconClock class="w-5 h-5 text-[#FF88A4]" />
					<span class="font-medium">{post.readingTime} {lang === 'fr' ? 'min de lecture' : 'min read'}</span>
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

<style>
	h1 :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
	}
</style>
