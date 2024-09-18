<script lang="ts">
	interface SectionTitleProps {
		title: string;
	}

	let { title }: SectionTitleProps = $props();
</script>

<h4 class="text-xl font-semibold bg-[#8aa3ff] p-1 px-3 text-center rounded-full text-white md:w-fit">
	{title}
</h4>
