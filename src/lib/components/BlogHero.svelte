<script lang="ts">
	import { IconPencil, IconSparkles } from '@tabler/icons-svelte';
	import type { Lang } from '$lib/utils/blog';

	let { lang = 'fr' }: { lang?: Lang } = $props();
</script>

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
						{lang === 'fr' ? 'Mon Blog' : 'My Blog'}
					</h1>
				</div>

				<p class="text-xl md:text-2xl text-[#555] leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
					{#if lang === 'fr'}
						Bienvenue dans mon univers ! Vous trouverez ici mes <strong class="text-[#8aa3ff]">réflexions</strong> sur le développement web, mes <strong class="text-[#FF88A4]">découvertes</strong> technologiques et mes retours d'expérience.
					{:else}
						Welcome to my corner of the internet! Here you'll find my <strong class="text-[#8aa3ff]">thoughts</strong> on web development, <strong class="text-[#FF88A4]">discoveries</strong> and hands-on experience.
					{/if}
				</p>

				<div class="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[#666]">
					<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
						<IconSparkles class="w-4 h-4 text-[#FF88A4]" />
						<span class="font-medium">{lang === 'fr' ? 'Développement Web' : 'Web Development'}</span>
					</div>
					<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
						<IconSparkles class="w-4 h-4 text-[#8aa3ff]" />
						<span class="font-medium">{lang === 'fr' ? "Retours d'expérience" : 'Experience & Insights'}</span>
					</div>
					<div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
						<IconSparkles class="w-4 h-4 text-[#FF88A4]" />
						<span class="font-medium">{lang === 'fr' ? 'Tutoriels' : 'Tutorials'}</span>
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
