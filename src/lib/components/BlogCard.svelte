<script lang="ts">
	import type { BlogPost } from '$lib/types/blog';
	import { formatDate } from '$lib/utils/blog';
	import { IconCalendar, IconClock, IconArrowRight, IconTag } from '@tabler/icons-svelte';

	let { post }: { post: BlogPost } = $props();
</script>

<article class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-blue-100 group hover:scale-105">
	{#if post.image}
		<div class="aspect-video bg-contain overflow-hidden">
			<img
				src={post.image}
				alt={post.title}
				loading="lazy"
				class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
			/>
		</div>
	{/if}
	
	<div class="p-6 md:p-8">
		{#if post.tags.length > 0}
			<div class="flex flex-wrap gap-2 mb-4">
				{#each post.tags.slice(0, 3) as tag}
					<span class="inline-flex items-center gap-1 text-xs font-medium text-[#8aa3ff] bg-blue-50 px-3 py-1 rounded-full border border-[#8aa3ff]/20">
						<IconTag class="w-3 h-3" />
						{tag}
					</span>
				{/each}
				{#if post.tags.length > 3}
					<span class="text-xs text-[#666] bg-gray-100 px-3 py-1 rounded-full">
						+{post.tags.length - 3}
					</span>
				{/if}
			</div>
		{/if}
		
		<h3 class="text-xl font-bold text-[#8aa3ff] mb-4 font-playwrite group-hover:text-[#7290fd] transition-colors leading-9">
			<a href="/blog/{post.slug}" class="hover:underline">
				{post.title}
			</a>
		</h3>
		
		<p class="text-[#666] mb-6 line-clamp-3 leading-relaxed">
			{post.description}
		</p>
		
		<div class="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm text-[#777]">
			<div class="flex items-center gap-4">
				<div class="flex items-center gap-1">
					<IconCalendar class="w-4 h-4 text-[#FF88A4]" />
					<span class="font-medium">{formatDate(post.date)}</span>
				</div>
				
				{#if post.readingTime}
					<div class="flex items-center gap-1">
						<IconClock class="w-4 h-4 text-[#FF88A4]" />
						<span class="font-medium">{post.readingTime} min</span>
					</div>
				{/if}
			</div>
		</div>
		
		<a 
			href="/blog/{post.slug}"
			class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] font-semibold transition-all duration-300 group-hover:gap-3"
		>
			Lire l'article
			<IconArrowRight class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
		</a>
	</div>
</article>