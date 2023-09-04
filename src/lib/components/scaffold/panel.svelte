<script lang="ts">
	import type { Align, Flex, Justify, Shadow, Unit } from "../model";

  export let title: string = '';
  export let titleStart: boolean = false;
  export let flex: Flex = '1 1 25em';
  export let shadow: Shadow | undefined = undefined;
  export let rowGap: `${number}${Unit}` = '2em';
  export let justify: Justify = 'start';
  export let align: Align = 'stretch';
</script>

<div id="panel" class:shadow style="--var-flex: {flex}; --var-shadow: {shadow}; --var-row-gap: {rowGap}; --var-justify: {justify}; --var-align: {align}">
  {#if title}
    <div id="title" class:titleStart>
      <slot name="title-prepend" />
      <h1>{title}</h1>
      <slot name="title-content" />
    </div>
  {/if}
  <slot />
</div>

<style>
  #panel {
    display: flex;
    flex: var(--var-flex);
    flex-direction: column;
    align-items: var(--var-align);
    justify-content: var(--var-justify);
    color: var(--color-text-A);
    border-radius: 5px;
    padding: 1em;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    row-gap: var(--var-row-gap);
  }

  #panel.shadow {
    box-shadow: var(--var-shadow);
  }

  #title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin-bottom: 0.2em;
    width: 100%;
  }

  #title > h1 {
    margin: 0;
    text-align: center;
    width: 100%;
  }

  #title.titleStart > h1 {
    text-align: left;
  }
</style>