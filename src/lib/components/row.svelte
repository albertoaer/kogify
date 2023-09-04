<script lang="ts">
	import type { Unit, Justify } from "./model";

  export let justify: Justify;
  export let wrap: boolean = false;
  export let grow: boolean = false;
  export let fullWidth: boolean = false;
  export let gap: `${number}${Unit}` = '0px';
</script>

<div class:wrap class:grow class:fullWidth style="--var-justify: {justify}; --var-gap: {gap}">
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: var(--var-justify) ;
    gap: var(--var-gap);
  }

  div.wrap {
    flex-wrap: wrap;
  }

  div.grow {
    flex-grow: 1;
  }

  div.fullWidth {
    width: 100%;
  }
</style>