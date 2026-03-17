<script lang="ts">
	interface Pagination {
		currentPage: number;
		totalPages: number;
		totalPosts: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	}

	let { pagination }: { pagination: Pagination } = $props();
</script>

{#if pagination.totalPages > 1}
	<div class="flex justify-center items-center gap-2">
		{#if pagination.hasPrevPage}
			<a
				href="?page={pagination.currentPage - 1}"
				class="px-4 py-2 bg-white text-[#8aa3ff] border-2 border-[#8aa3ff] rounded-lg hover:bg-blue-50 transition-colors font-medium"
			>
				← Précédent
			</a>
		{/if}

		{#each Array(pagination.totalPages) as _, i}
			{@const pageNum = i + 1}
			<a
				href="?page={pageNum}"
				class="px-4 py-2 rounded-lg font-medium transition-colors {pageNum === pagination.currentPage
					? 'bg-[#8aa3ff] text-white shadow-md'
					: 'bg-white text-[#8aa3ff] border-2 border-[#8aa3ff] hover:bg-blue-50'}"
			>
				{pageNum}
			</a>
		{/each}

		{#if pagination.hasNextPage}
			<a
				href="?page={pagination.currentPage + 1}"
				class="px-4 py-2 bg-white text-[#8aa3ff] border-2 border-[#8aa3ff] rounded-lg hover:bg-blue-50 transition-colors font-medium"
			>
				Suivant →
			</a>
		{/if}
	</div>

	<p class="text-center text-sm text-[#666] mt-4">
		Page {pagination.currentPage} sur {pagination.totalPages} ({pagination.totalPosts} articles)
	</p>
{/if}
