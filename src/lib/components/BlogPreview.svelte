<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import SectionTitle from './SectionTitle.svelte';
	import { IconPencil, IconArrowRight } from '@tabler/icons-svelte';
	import { formatDate } from '$lib/utils/blog';

	let { posts = [] }: { posts: BlogPost[] } = $props();
</script>

<div class="mt-16 space-y-7">
	<div class="flex items-center gap-3">
		<SectionTitle title="BLOG" />
		<IconPencil class="w-6 h-6 text-[#FF88A4]" />
	</div>

	{#if posts.length > 0}
		<div class="space-y-4">
			{#each posts as post}
				<article class="border-l-[3px] border-dotted border-blue-300 pl-6 py-3 hover:border-[#8aa3ff] transition-colors">
					<a href="/fr/blog/{post.slug}" class="group">
						<h3 class="text-lg font-semibold text-[#8aa3ff] group-hover:text-[#7290fd] transition-colors mb-1 font-playwrite">
							{@html post.title.replace(/`([^`]+)`/g, '<code class="font-mono bg-[#8aa3ff]/10 px-1 rounded text-base mx-0.5">$1</code>')}
						</h3>
						<p class="text-sm text-[#666] mb-2 line-clamp-2">
							{post.description}
						</p>
						<div class="flex items-center justify-between">
							<span class="text-xs text-[#999]">{formatDate(post.date)}</span>
							<IconArrowRight class="w-4 h-4 text-[#FF88A4] group-hover:translate-x-1 transition-transform" />
						</div>
					</a>
				</article>
			{/each}
		</div>

		<div class="text-center">
			<a href="/fr/blog" class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] font-semibold transition-colors">
				Voir tous les articles
				<IconArrowRight class="w-4 h-4" />
			</a>
		</div>
	{:else}
		<div class="text-center py-8">
			<div class="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
				<IconPencil class="w-8 h-8 text-[#8aa3ff]" />
			</div>
			<p class="text-[#666] mb-4 font-playwrite">Bientôt des articles passionnants !</p>
			<a href="/fr/blog" class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] font-semibold transition-colors">
				<IconPencil class="w-4 h-4" />
				Découvrir mon blog
			</a>
		</div>
	{/if}
</div>

<style>
	h3 :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
	}
</style>
