<script lang="ts">
  export let title: string = '';
  export let centerTitle: boolean = false;
  export let base: number = 50;
  export let bigPanel: boolean = false;
</script>

<div id="panel" style="--var-base: {base}%" class:big-panel={bigPanel}>
  {#if title}
    <div id="title">
      <h1 class:centerTitle>{title}</h1>
      <slot name="title-content" />
    </div>
  {/if}
  <slot />
</div>

<style>
  #panel {
    color: var(--color-light-A);
    background-color: var(--color-strongest);
    border-radius: 5px;
    padding: 2em 1.5em;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
    flex-basis: var(--var-base);
    max-width: 100%;
    position: relative;
  }

  #title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    margin-bottom: 2em;
  }

  #title > h1 {
    margin: 0;
  }

  @media (max-width: 500px) {
    #panel {
      border-radius: 0px;
    }
  }
  
  @media (max-width: 1200px) {
    #panel.big-panel {
      flex-basis: 100%;
    }
  }
</style>