<script lang="ts">
	let { content, image, imageAlt = '' }: { content: string; image?: string; imageAlt?: string } = $props();
</script>

<article class="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100">
	{#if image}
		<div class="aspect-video md:aspect-[2/1] overflow-hidden">
			<img
				src={image}
				alt={imageAlt}
				class="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
			/>
		</div>
	{/if}

	<div class="p-8 md:p-12 lg:p-16">
		<div class="prose prose-lg prose-slate max-w-none blog-reading
					prose-headings:font-playwrite prose-headings:text-[#8aa3ff] prose-headings:scroll-mt-20
					prose-h1:text-3xl prose-h1:leading-[3rem] prose-h1:mb-8 prose-h1:border-b prose-h1:border-blue-200 prose-h1:pb-4
					prose-h2:text-2xl prose-h2:leading-10 prose-h2:mb-6 prose-h2:mt-12 prose-h2:border-l-4 prose-h2:border-[#94b1f5] prose-h2:md:px-6 prose-h2:px-2 prose-h2:py-3 prose-h2:bg-blue-50/50 prose-h2:rounded-r-lg
					prose-h3:text-xl prose-h3:leading-10 prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-[#666] prose-h3:border-b prose-h3:border-gray-200 prose-h3:pb-2
					prose-h4:text-lg prose-h4:leading-10 prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-[#777] prose-h4:font-semibold
					prose-p:text-[#333] prose-p:mb-8 prose-p:text-base
					prose-a:text-[#FF88A4] prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[#e570a0] prose-a:transition-colors
					prose-strong:text-[#8aa3ff] prose-strong:font-semibold
					prose-em:text-[#555] prose-em:italic
					prose-code:bg-blue-50 prose-code:text-[#8aa3ff] prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
					prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700 prose-pre:shadow-lg
					prose-pre:code:bg-transparent prose-pre:code:text-slate-100 prose-pre:code:p-0
					prose-blockquote:border-l-4 prose-blockquote:border-[#FF88A4] prose-blockquote:bg-gradient-to-r prose-blockquote:from-pink-50 prose-blockquote:to-transparent prose-blockquote:rounded-r-lg prose-blockquote:p-2 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-[#555]
					prose-ul:my-8 prose-ol:my-8
					prose-li:text-[#333] prose-li:mb-3
					prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-200 prose-img:my-8
					prose-table:my-8 prose-table:shadow-lg prose-table:rounded-lg prose-table:overflow-hidden
					prose-th:bg-[#8aa3ff] prose-th:text-white prose-th:font-semibold prose-th:p-4
					prose-td:p-4 prose-td:border-b prose-td:border-gray-200
					prose-hr:my-12 prose-hr:border-blue-200">
			{@html content}
		</div>
	</div>
</article>

<style>
	:global(.blog-reading.prose p) {
		line-height: 2.0 !important;
	}

	:global(.blog-reading.prose li) {
		line-height: 1.8 !important;
	}

	:global(.blog-reading.prose blockquote) {
		line-height: 1.8 !important;
	}

	:global(.prose.prose-lg.prose-slate p) {
		line-height: 2.0 !important;
	}

	:global(.prose.prose-lg.prose-slate li) {
		line-height: 1.8 !important;
	}

	:global(.heading-link) {
		text-decoration: none !important;
		cursor: pointer;
		color: inherit;
		transition: text-decoration 0.2s;
	}

	:global(.heading-link:hover) {
		color: inherit;
		text-decoration: underline !important;
	}

	:global(.hljs) {
		box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05) !important;
		overflow-x: auto !important;
		font-size: 0.875rem !important;
		line-height: 1.5 !important;
	}

	:global(.prose pre) {
		background: #282c34 !important;
		border-radius: 0.75rem !important;
		box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05) !important;
		border: 1px solid rgba(148, 177, 245, 0.2) !important;
		overflow-x: auto !important;
	}

	:global(.prose pre code) {
		background: transparent !important;
		color: #abb2bf !important;
		padding: 0 !important;
		font-size: 0.875rem !important;
		line-height: 1.5 !important;
	}

	:global(.prose code:not(pre code)) {
		background: #eff6ff !important;
		color: #8aa3ff !important;
		border-radius: 0.375rem !important;
		font-family: ui-monospace, SFMono-Regular, 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace !important;
		font-size: 0.875rem !important;
		font-weight: 500 !important;
	}
</style>
