<script lang="ts">
  export let title: string = '';
  export let centerTitle: boolean = false;
  export let base: number = 50;
</script>

<div id="panel" style="--var-base: {base}%">
  {#if title}
    <h1 class:centerTitle>{title}</h1>
  {/if}
  <slot />
</div>

<style>
  #panel {
    color: var(--color-light-A);
    background-color: var(--color-strongest);
    border-radius: 5px;
    padding: 0 1.5em;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    flex-basis: var(--var-base);
    max-width: 100%;
  }

  @media (max-width: 500px) {
    #panel {
      border-radius: 0px;
    }
  }
</style>