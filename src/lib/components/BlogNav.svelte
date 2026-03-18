<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte';
	import type { Lang } from '$lib/utils/blog';

	let {
		href,
		label,
		narrow = false,
		lang,
		altHref
	}: { href: string; label: string; narrow?: boolean; lang?: Lang; altHref?: string } = $props();
</script>

<nav class="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10">
	<div class="{narrow ? 'max-w-4xl' : 'max-w-6xl'} mx-auto px-5 py-4 flex items-center justify-between">
		<a {href} class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] transition-all duration-300 font-semibold group">
			<IconArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
			{label}
		</a>

		{#if lang && altHref}
			<div class="flex items-center gap-1 bg-blue-50 rounded-full p-1 border border-blue-100">
				<a
					href={lang === 'en' ? altHref : undefined}
					aria-current={lang === 'fr' ? 'page' : undefined}
					class="px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 {lang === 'fr' ? 'bg-[#8aa3ff] text-white shadow-sm' : 'text-[#8aa3ff] hover:bg-blue-100'}"
				>
					FR
				</a>
				<a
					href={lang === 'fr' ? altHref : undefined}
					aria-current={lang === 'en' ? 'page' : undefined}
					class="px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 {lang === 'en' ? 'bg-[#8aa3ff] text-white shadow-sm' : 'text-[#8aa3ff] hover:bg-blue-100'}"
				>
					EN
				</a>
			</div>
		{/if}
	</div>
</nav>
