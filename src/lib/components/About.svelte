<script lang="ts">
	import type { PortfolioData } from '$lib/types/portfolio';
	import MyImage from '$lib/images/moi.jpg?enhanced';
	let { data }: { data: PortfolioData } = $props();
</script>

<section class="border-4 rounded-lg border-blue-300 relative mb-10 md:h-52">
	<enhanced:img
		src={MyImage}
		alt={data.name}
		class="max-md:hidden w-60 h-60 -top-5 -left-[5.3rem] absolute max-w-none max-h-none rounded-full object-cover"
	/>
	<div class="md:absolute -top-12 md:right-52 space-y-1 md:space-y-2">
		<h2 class="text-2xl text-center md:text-4xl font-bold bg-white p-4 text-[#8aa3ff] custom-font">
			{data.name}
		</h2>
		<h3 class="text-xl md:text-2xl text-[#333333] font-light text-center mr-3">{data.title}</h3>
	</div>
	<div class="md:my-16 mb-5">
		<p class="mt-2 md:text-lg text-[#333333] md:pl-48 md:pr-12 font-thin text-left px-5">
			<span class="text-[#8aa3ff] font-normal text-2xl">Salut</span>, je m'appelle {data.name}. Je
			viens de {data.location}. {data.about}
		</p>
	</div>
</section>
