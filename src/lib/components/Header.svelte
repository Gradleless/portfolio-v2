<script>
	import StarColumn from './StarColumn.svelte';
	import QRCode from "$lib/images/qr-code.png?enhanced";
</script>

<section class="md:px-16 px-5 min-h-screen">
	<div class="text-left flex flex-wrap gap-2 md:items-end custom-font mb-5">
		<h1 class="text-5xl 2xl:text-6xl font-bold text-[#8aa3ff]">Salut,</h1>
		<p class="mt-2 text-xl 2xl:text-2xl text-[#333333] leading-9">
			Je suis heureuse de vous rencontrer
		</p>
	</div>
	<p class="custom-font leading-10 2xl:text-lg">
		J'espère que vous aimerez mon
		<span class="relative">
			Portfolio
			<span class="absolute right-[-1.8vw] rotate-12 top-3 text-[#C8D4FF] text-2xl 2xl:text-3xl">♡</span>
		</span>
	</p>

	<div class="flex justify-between pt-5 2xl:pt-10 pb-64 relative">
		<div class="flex flex-row space-x-10 items-end relative">
			<StarColumn height="h-40 2xl:h-72" starPosition="-bottom-[1.6rem]" />
			<StarColumn height="h-40 2xl:h-72 mb-10" starPosition="bottom-[0.9rem]" />
			<StarColumn height="h-40 2xl:h-72 mb-3" starPosition="-bottom-[0.85rem]" />
		</div>

		<div class="absolute bottom-10 right-0 hover:scale-110 duration-200">
			<enhanced:img src={QRCode} alt="QR Code" class="w-32 h-32 md:w-48 md:h-48 2xl:h-56 2xl:w-56" />
			<p
				class="mt-3 px-4 md:px-10 py-1 rounded-full border-pink-200 border-2 text-[#FF88A4] font-semibold text-sm 2xl:text-base text-center"
			>
				Mon CV
			</p>
		</div>
	</div>
</section>
