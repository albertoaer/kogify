<script lang="ts">
	import { isPolicyEnabled } from "$lib/policy";

  export let src: string;
  export let name: string;
  export let href: string | undefined = undefined;
  export let blur: boolean = false;
  export let hiddenContent: boolean = false;
  export let rounded: boolean = false;
  export let shadow: `${number}px ${number}px ${number}px ${number}px ${string}` | undefined = undefined;
  export let size: `${number}${'em' | 'px'}` | undefined = undefined;

  const cardPolicy = isPolicyEnabled('card-policy');

  if (cardPolicy) {
    blur = false;
    hiddenContent = false;
    rounded = false;
  }
</script>

<a id="item" {href} class:rounded class:size class:shadow style="--var-size: {size}; --var-shadow: {shadow}">
  <img {src} alt={name} class:blur/>
  {#if !cardPolicy}
    <div id="content" class:hiddenContent>
      <slot />
    </div>
  {/if}
</a>

<style>
  #item {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    position: relative;
    text-decoration: none;
    background-color: var(--color-background-A);
    overflow: hidden;
    transition: 500ms all ease;
    width: 100%;
    height: 100%;
    margin: 1.5em;
  }

  #item.size {
    width: var(--var-size);
    height: var(--var-size);
  }

  #item.shadow {
    box-shadow: var(--var-shadow);
  }
  
  .rounded {
    border-radius: 5px;
  }

  #item[href] {
    cursor: pointer;
  }

  #content {
    display: flex;
    justify-content: center;
    width: 100%;
    color: var(--color-text-A);
    text-shadow: 0px 0px 5px black;
    position: relative;
    overflow: hidden;
    max-height: 20em;
    user-select: none;
    padding: 0.5em;
  }

  #content.hiddenContent {
    opacity: 0;
    transition: 1s all ease;
  }

  #item img {
    object-fit: cover;
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 1s all ease;
  }
  
  #item:not(.maximized):hover {
    background-color: var(--color-text-B);
    transition: 300ms all ease;
  }

  #item:hover > img.blur {
    filter: blur(5px) hue-rotate(20deg) contrast(120%);
    transition: 300ms all ease;
  }
  
  #item:hover > #content.hiddenContent {
    opacity: 1;
    transition: 1s all ease;
  }
</style>