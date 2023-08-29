<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Panel, Expandable, Button } from ".";

  interface $$Props extends ComponentProps<Panel>, ComponentProps<Expandable> {}

  export let active: boolean = false;
</script>

<Panel {...$$restProps}>
  <svelte:fragment slot='title-content'>
    <Button on:click={_ => active = !active}>{active ? 'Less' : 'More'}</Button>
    <slot name='title-content' />
  </svelte:fragment>
  <Expandable {active}>
    <slot />
  </Expandable>
</Panel>