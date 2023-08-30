<script lang="ts">
  export let justify: 'start' | 'center' | 'end' | 'space-around' | 'space-evenly' | 'space-between';
  export let wrap: boolean = false;
  export let margin: boolean = false;
  export let grow: boolean = false;
  export let fullWidth: boolean = false;
</script>

<div class:wrap class:margin class:grow class:fullWidth style="--var-justify: {justify}">
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

  div.margin {
    margin: 1em 0;
  }

  div.grow {
    flex-grow: 1;
  }

  div.fullWidth {
    width: 100%;
  }
</style>