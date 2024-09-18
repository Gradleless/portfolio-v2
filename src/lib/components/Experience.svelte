<script lang="ts">
	import type { Experience } from '$lib/types/portfolio';
	import SectionTitle from './SectionTitle.svelte';
	import ExperienceItem from './ExperienceItem.svelte';

	let { data }: { data: Experience[] } = $props();
</script>

<div class="space-y-7">
	<SectionTitle title="EXPÉRIENCES" />
	{#each data as experience}
		<ExperienceItem
			title={experience.title}
			period={experience.period}
			description={experience.description}
		/>
	{/each}
</div>
