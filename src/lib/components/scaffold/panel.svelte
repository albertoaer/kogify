<script lang="ts">
	import type { Align, Flex, Justify, Shadow, UnitValue, Padding } from "../model";

  export let title: string = '';
  export let titleStart: boolean = false;
  export let flex: Flex = '1 1 25em';
  export let shadow: Shadow | undefined = undefined;
  export let rowGap: UnitValue = '2em';
  export let justify: Justify = 'start';
  export let align: Align = 'stretch';
  export let titleTag: string = 'h1';
  export let padding: Padding = `1em`;
</script>

<div id="panel-wrapper" class:shadow style="--var-padding: {padding}; --var-flex: {flex}; --var-shadow: {shadow}; --var-row-gap: {rowGap}; --var-justify: {justify}; --var-align: {align}">
  {#if title}
    <div id="title-row">
      <slot name="title-prepend" />
      <svelte:element this={titleTag} id="title" class:titleStart>{title}</svelte:element>
      <slot name="title-content" />
    </div>
  {/if}
  <div id="panel">
    <slot />
  </div>
</div>

<style>
  #panel-wrapper {
    display: flex;
    flex: var(--var-flex);
    flex-direction: column;
    padding: 0em;
    padding: var(--var-padding);
    overflow-y: auto;
    overflow-x: hidden;
  }

  #panel-wrapper.shadow {
    box-shadow: var(--var-shadow);
  }

  #panel {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: var(--var-align);
    justify-content: var(--var-justify);
    color: var(--color-text-A);
    padding: 0;
    margin: 0;
    position: relative;
    row-gap: var(--var-row-gap);
  }

  #title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin-bottom: 2em;
    width: 100%;
  }

  #title {
    margin: 0;
    text-align: center;
    width: 100%;
  }

  #title.titleStart {
    text-align: left;
  }
</style>