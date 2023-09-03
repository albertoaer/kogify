<script lang="ts">
  export let flex: `${number} ${number} ${number}${'px' | 'em' | '%'}` | `${number} ${number} auto` = '1 1 25em';
</script>

<div style="--var-flex: {flex}">
  <slot />
</div>

<style>
  div {
    display: flex;
    flex: var(--var-flex);
    flex-wrap: wrap;
  }
</style>