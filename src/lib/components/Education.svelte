<script lang="ts">
	import type { PortfolioData } from '../types/portfolio';
	import SectionTitle from './SectionTitle.svelte';
	import ListWithStar from './ListWithStar.svelte';

	let { data }: { data: PortfolioData } = $props();
</script>

<div class="space-y-7 mb-7">
	<SectionTitle title="ÉDUCATION" />
	{#each data.education as edu}
		<div class="flex items-center gap-7">
			<h5 class="text-xl min-w-fit font-semibold -mt-3 text-[#FF88A4] -ml-1">{edu.period}</h5>
			<p class="">{edu.description}</p>
		</div>
	{/each}

	<SectionTitle title="CERTIFICATIONS" />
	<ListWithStar items={data.certifications} />

	<SectionTitle title="LANGUES" />
	<ListWithStar items={data.languages} />
</div>
