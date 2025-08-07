<script lang="ts">
    import "../app.css";
    import { Toaster } from 'svelte-sonner';

    let { children } = $props();
</script>

<div>
    {@render children()}
</div>

<svelte:head>
    <script defer src="https://umami.anhost.fr/script.js" data-website-id="abe58f16-1594-4bce-970c-a3a2e88a78dd"></script>
</svelte:head>

<Toaster richColors position="bottom-right" />
