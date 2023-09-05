<script lang="ts">
	import type { UnitValue, Justify, Align } from "./model";

  export let align: Align = 'center';
  export let justify: Justify = 'center';
  export let wrap: boolean = false;
  export let grow: boolean = false;
  export let width: UnitValue | 'auto' = 'auto';
  export let gap: UnitValue = '0px';
</script>

<div class:wrap class:grow style="--var-align: {align}; --var-justify: {justify}; --var-gap: {gap}; --var-width: {width}">
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: var(--var-align);
    justify-content: var(--var-justify) ;
    gap: var(--var-gap);
    width: var(--var-width);
  }

  div.wrap {
    flex-wrap: wrap;
  }

  div.grow {
    flex-grow: 1;
  }
</style>