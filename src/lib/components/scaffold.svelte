<script lang="ts">
	import { Container, Card } from ".";
  import { blur } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
	import Link from "./link.svelte";

  export let image: string | undefined = undefined;
  export let title: string;
  export let href: string | undefined = undefined;
</script>

<Container>
  <Link {href}><h1>{title}</h1></Link>
  <div id="main" in:blur={{duration: 250, easing: cubicOut}}>
    {#if image}
      <Card src={image} name={title} {href} rounded size="20em" shadow="-2px 2px 25px 0px var(--color-effect-A)" />
    {/if}
    <slot />
  </div>
</Container>

<style>
  h1 {
    width: 100%;
    text-align: center;
    color: var(--color-text-A);
    margin: 0 0 1em 0;
    padding: 0;
  }

  #main {
    display: flex;
    flex-direction: row-reverse;
    align-items: stretch;
    justify-content: center;
    width: max(80%, 450px);
    flex-wrap: wrap;
    gap: 1em;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 500px) {
    #main {
      width: 100%;
    }
  }
</style>