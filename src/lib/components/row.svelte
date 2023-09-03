<script lang="ts">
  export let justify: 'start' | 'center' | 'end' | 'space-around' | 'space-evenly' | 'space-between';
  export let wrap: boolean = false;
  export let grow: boolean = false;
  export let fullWidth: boolean = false;
  export let gap: `${number}${'em' | 'px'}` = '0px';
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