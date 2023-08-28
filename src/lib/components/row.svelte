<script lang="ts">
  export let justify: 'start' | 'center' | 'end' | 'space-around' | 'space-evenly' | 'space-between';
  export let wrap: boolean = false;
</script>

<div class:wrap style="--var-justify: {justify}">
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: var(--var-justify) ;
  }

  div.wrap {
    flex-wrap: wrap;
  }
</style>