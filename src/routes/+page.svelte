<script>
  import { Toaster } from "svelte-sonner"
  import Header from '$lib/components/Header.svelte';
  import About from '$lib/components/About.svelte';
  import Education from '$lib/components/Education.svelte';
  import Experience from '$lib/components/Experience.svelte';
  import Sidebar from '$lib/components/Aside.svelte';
  import { portfolioData } from '$lib/stores/portfolio';
  import '../app.css';
</script>

<svelte:head>
  <title>Portfolio - Lycia Dufour</title>
  <meta name="description" content="Portfolio de Lycia Dufour, étudiante en informatique." />
  <meta name="keywords" content="portfolio, Lycia Dufour, étudiante, informatique" />
  <meta name="author" content="Lycia Dufour" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="/sparkle.svg" />
  
  <meta property="og:title" content="Portfolio - Lycia Dufour">
  <meta property="og:description" content="Portfolio de la développeuse web dont vous aurez bientôt besoin">
  <meta property="og:image" content="https://lycia.anhost.fr/og.png">
  <meta property="og:url" content="https://lycia.anhost.fr">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Portfolio - Lycia Dufour">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Portfolio - Lycia Dufour">
  <meta name="twitter:description" content="Portfolio de la développeuse web dont vous aurez bientôt besoin">
  <meta name="twitter:image" content="https://lycia.anhost.fr/og.png">
  <link rel="canonical" href="https://lycia.anhost.fr">

</svelte:head>
<main class="min-h-screen bg-[#fcf8f0] max-md:py-24 md:pt-32">
  <Header />
  
  <section class="md:flex gap-16">
    <div class="bg-white py-24 lg:px-24 px-5">
      <About data={portfolioData} />
      <div class="lg:grid lg:grid-cols-2 gap-5 lg:gap-16">
        <Education data={portfolioData} />
        <Experience data={portfolioData.experiences} />
      </div>
    </div>
    <Sidebar data={portfolioData} />
  </section>
  <Toaster richColors />
</main>