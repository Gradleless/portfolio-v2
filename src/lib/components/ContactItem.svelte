<script lang="ts">
	interface ContactItemProps {
		href: string;
		text: string;
		Icon: any;
	}

	let { href, text, Icon }: ContactItemProps = $props();
</script>

<a
	{href}
	target="_blank"
	rel="noreferrer"
	class="flex gap-1 group hover:text-zinc-500 duration-300"
>
	<Icon class="w-6 h-6 text-[#FF88A4] group-hover:text-pink-300 transition-colors duration-300" />
	{text}
</a>
