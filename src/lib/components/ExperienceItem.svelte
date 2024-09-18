<script>
	let { title, period, description } = $props();
</script>

<div class="mt-2 border-l-[3px] border-dotted border-blue-300 pl-10 relative">
	<div class="flex flex-col items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="absolute -left-[0.73rem] -top-[0.49rem] fill-[#94b1f5] text-[#94b1f5] hover:rotate-90 duration-200"
		>
			<path
				d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
			/>
		</svg>
	</div>
	<h5 class="text-xl font-semibold -mt-3 text-[#FF88A4]">{title}</h5>
	<h6 class="text-lg font-light mb-3">{period}</h6>
	<p>{description}</p>
</div>
