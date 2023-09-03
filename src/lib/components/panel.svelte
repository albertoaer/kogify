<script lang="ts">
  export let title: string = '';
  export let flex: `${number} ${number} ${number}${'px' | 'em' | '%'}` | `${number} ${number} auto` = '1 1 25em';
  export let shadow: `${number}px ${number}px ${number}px ${number}px ${string}` | undefined = undefined;
</script>

<div id="panel" class:shadow style="--var-flex: {flex}; --var-shadow: {shadow}">
  {#if title}
    <div id="title">
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
    align-items: stretch;
    justify-content: start;
    color: var(--color-text-A);
    border-radius: 5px;
    padding: 1.5em;
    margin: 0;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    row-gap: 2em;
  }

  #panel.shadow {
    box-shadow: var(--var-shadow);
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
    text-align: center;
    width: 100%;
  }
</style>