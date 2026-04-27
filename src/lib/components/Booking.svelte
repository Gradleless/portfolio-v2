<script lang="ts">
	import { IconCalendar, IconCalendarEvent, IconClock } from '@tabler/icons-svelte';
	import { onMount, tick } from 'svelte';
	import SectionTitle from './SectionTitle.svelte';

	const BOOKING_URL = 'https://fenetre.lycia.dev';
	const BOOKING_USERNAME = 'lycia-dufour';

	type EventType = {
		slug: string;
		name: string;
		description: string;
		duration: number;
		color: string;
	};

	let eventTypes: EventType[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		(window as any).BOOKING_URL = BOOKING_URL;
		(window as any).BOOKING_USERNAME = BOOKING_USERNAME;

		try {
			const res = await fetch(`${BOOKING_URL}/api/${BOOKING_USERNAME}/event-types`);
			if (res.ok) eventTypes = await res.json();
		} catch {
			// API Ko
		} finally {
			loading = false;
		}

		// Waiting for svelte to render the buttons
		await tick();

		const script = document.createElement('script');
		script.src = `${BOOKING_URL}/booking-widget.js`;
		document.head.appendChild(script);
	});
</script>

<section class="space-y-4">
	<SectionTitle title="RÉSERVER" />

	<p class="text-sm text-[#666] font-playwrite leading-6">
		Choisissez un créneau selon vos disponibilités.
	</p>

	<div class="space-y-3">
		<button
			data-booking
			data-username={BOOKING_USERNAME}
			class="w-full flex items-center gap-3 bg-[#8aa3ff] hover:bg-[#7290fd] active:bg-[#4c63b6] active:duration-0 text-white px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer"
		>
			<IconCalendar class="w-5 h-5 shrink-0" />
			<div class="text-left">
				<div class="font-semibold text-sm">Voir tous les créneaux</div>
				<div class="text-xs text-[#C8D4FF]">Choisir un type de rdv</div>
			</div>
		</button>

		{#if loading}
			{#each [1, 2] as _}
				<div class="w-full h-[60px] bg-gray-100 rounded-xl animate-pulse"></div>
			{/each}
		{:else}
			{#each eventTypes as et, i}
				{@const isBlue = i % 2 === 0}
				<button
					data-event={et.slug}
					data-username={BOOKING_USERNAME}
					class={[
						'w-full flex items-center gap-3 bg-white border-2 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer',
						isBlue
							? 'border-[#8aa3ff] text-[#8aa3ff] hover:bg-[#f0f4ff]'
							: 'border-[#FF88A4] text-[#FF88A4] hover:bg-[#fff0f3]'
					].join(' ')}
				>
					{#if et.duration <= 30}
						<IconClock class="w-5 h-5 shrink-0" />
					{:else}
						<IconCalendarEvent class="w-5 h-5 shrink-0" />
					{/if}
					<div class="text-left">
						<div class="font-semibold text-sm">{et.name}</div>
						<div class="text-xs text-[#aaa]">
							{et.duration} min{et.description ? ` · ${et.description}` : ''}
						</div>
					</div>
				</button>
			{/each}
		{/if}
	</div>
</section>
