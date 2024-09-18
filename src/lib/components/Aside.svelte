<script lang="ts">
	import type { PortfolioData } from '$lib/types/portfolio';
	import SectionTitle from './SectionTitle.svelte';
	import InterestTag from './InterestTag.svelte';
	import ContactItem from './ContactItem.svelte';
	import { IconMailForward, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-svelte';
	import Technologies from './Technologies.svelte';
	import Form from './Form.svelte';
	let { data }: { data: PortfolioData } = $props();

	const iconMap: any = {
		IconMailForward,
		IconBrandLinkedin,
		IconBrandGithub
	};
</script>

<div class="max-md:mx-5 md:mr-16 space-y-10 md:space-y-24 min-w-72">
	<section class="mt-10 space-y-4">
		<SectionTitle title="INTÉRÊTS" />
		<div class="flex flex-wrap justify-between gap-2">
			{#each data.interests as interest}
				<InterestTag text={interest} />
			{/each}
		</div>
	</section>

	<section class="space-y-4">
		<SectionTitle title="TECHNOLOGIES" />
		<Technologies data={data.technologies} />
	</section>

	<section class="space-y-4 transition-transform duration-300">
		<SectionTitle title="CONTACT" />
		<address class="space-y-2">
			{#each data.contact as item}
				<ContactItem href={item.href} Icon={iconMap[item.icon]} text={item.text} />
			{/each}
		</address>
	</section>

	<section class="mt-10 space-y-4">
		<SectionTitle title="FORMULAIRE" />
		<Form />
	</section>
</div>
