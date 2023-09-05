<script lang="ts">
	import type { UnitValue } from "./model";

  export let alt: boolean = false;
  export let width: UnitValue | 'auto' = 'auto';
</script>

<button on:click on:mouseover on:mouseout on:focus on:blur class:alt style="--var-width: {width}">
  <slot />
</button>

<style>
  button {
    margin: 0;
    border: 1px solid var(--color-effect-A);
    width: var(--var-width);
    color: var(--color-text-A);
    background-color: transparent;
    font-size: inherit;
    padding: 0.45em 0.6em;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    transition: 200ms all ease;
  }

  button.alt {
    border-color: var(--color-effect-B);
  }
  
  button:hover {
    background-color: transparent;
    box-shadow: 0 0px 5px 2px var(--color-effect-A);
    transition: 200ms all ease;
  }

  button.alt:hover {
    box-shadow: 0 0px 5px 2px var(--color-effect-B);
  }
  
  button:active {
    transform: scale(1.05);
    transition: 50ms all ease;
  }
</style>