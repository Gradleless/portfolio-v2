<script lang="ts">
    import "../app.css";
    import { Toaster } from 'svelte-sonner';

    let { children } = $props();
</script>

<div>
    {@render children()}
</div>

<Toaster richColors position="bottom-right" />
