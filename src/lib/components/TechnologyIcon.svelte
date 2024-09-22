<script lang="ts">
  interface TechnologyIconProps {
    src: string;
    alt: string;
    href: string;
  }

  let { src, alt, href }: TechnologyIconProps = $props();
  $effect.pre(() => {
    src = "./techIcons/" + src + ".webp";
  });
</script>

<a {href} target="_blank" rel="noopener noreferrer">
  <img {src} {alt} class="w-10 h-10" />
</a>
