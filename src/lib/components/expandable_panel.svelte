<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Panel, Expandable, Button } from ".";

  interface $$Props extends ComponentProps<Panel>, ComponentProps<Expandable> {}

  export let active: boolean = false;
</script>

<Panel {...$$restProps}>
  <Button slot='title-content' on:click={_ => active = !active}>{active ? 'Less' : 'More'}</Button>
  <Expandable {active}>
    <slot />
  </Expandable>
</Panel>