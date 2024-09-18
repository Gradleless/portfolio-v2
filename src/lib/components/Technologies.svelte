<script lang="ts">
	import type { Technology } from '$lib/types/portfolio';
	import { flip } from 'svelte/animate';
	import TechnologyIcon from './TechnologyIcon.svelte';
	import { crossfade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let { data }: { data: Technology[] } = $props();
	let currentData: Technology[] = $state([]);
	let toggled = $state(false);

	const toggle = () => {
		toggled = !toggled;
	};

    const [send, receive] = crossfade({
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	$effect(() => {
		console.log('toggled', toggled);
		if (toggled) {
			currentData = data;
		} else {
			currentData = data.slice(0, 6);
		}
	});
</script>

<div class="flex flex-wrap gap-2 md:max-w-72">
	{#each currentData as tech (tech.alt)}
        <span animate:flip={{ duration: 500 }} in:receive={{ key: tech.alt }} out:send={{ key: tech.alt }}>
			<TechnologyIcon src={tech.src} alt={tech.alt} href={tech.href} />
        </span>
	{/each}
	<button onclick={toggle}>
		<div class="rounded-md border-[#FF88A4] border-2 hover:border-pink-300 fill-[#FF88A4] hover:fill-pink-200 duration-300">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="plus {toggled ? 'minus' : ''} p-1"
				width="35"
				height="35"
				viewBox="0 0 160 160"
			>
				<rect class="vertical-line" x="70" width="20" height="160" />
				<rect class="horizontal-line" y="70" width="160" height="20" />
			</svg>
		</div>
	</button>
</div>

<style>
	.plus rect {
        @apply transition-transform duration-500;
		transform-origin: 50% 50%;
	}

	.plus.minus .vertical-line {
		@apply rotate-90;
	}
</style>
