<script lang="ts">
  import { blur } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
	import Link from "../link.svelte";
	import { setContext } from "svelte";
	import type { ScaffoldData } from "./model";
	import type { Align, Justify } from "../model";

  export let image: string | undefined = undefined;
  export let title: string;
  export let href: string | undefined = undefined;
  export let justify: Justify = 'space-between';
  export let align: Align = 'start';

  setContext<ScaffoldData>('scaffold', {
    title,
    pictureSrc: image,
    href
  });
</script>

<div id="wrapper">
  <Link {href}><h1>{title}</h1></Link>
  <div id="main" in:blur={{duration: 250, easing: cubicOut}} style="--var-justify: {justify}; --var-align: {align}">
    <slot />
  </div>
</div>

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
    flex-direction: row;
    align-items: var(--var-align);
    justify-content: var(--var-justify);
    width: max(90%, 450px);
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

  #wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 100%;
    max-height: 100%;
    margin: 0.5em;
  }

  @media (max-width: 500px) {
    #wrapper {
      margin: 1em 0;
    }
  }
</style>