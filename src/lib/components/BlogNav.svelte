<script lang="ts">
	import { IconArrowLeft } from '@tabler/icons-svelte';

	let { href, label, narrow = false }: { href: string; label: string; narrow?: boolean } = $props();
</script>

<nav class="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-10">
	<div class="{narrow ? 'max-w-4xl' : 'max-w-6xl'} mx-auto px-5 py-4">
		<a {href} class="inline-flex items-center gap-2 text-[#8aa3ff] hover:text-[#7290fd] transition-all duration-300 font-semibold group">
			<IconArrowLeft class="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
			{label}
		</a>
	</div>
</nav>
