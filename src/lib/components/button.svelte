<script lang="ts">
  export let alt: boolean = false;
</script>

<button on:click on:mouseover on:mouseout on:focus on:blur class:alt>
  <slot />
</button>

<style>
  button {
    margin: 0;
    border: 1px solid var(--color-effect-A);
    color: var(--color-text-A);
    background-color: var(--color-background-A);
    font-size: inherit;
    padding: 0.45em 0.6em;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    transition: 200ms all ease;
  }

  button.alt {
    border-color: var(--color-effect-B);
  }
  
  button:hover {
    background-color: var(--color-background-A);
    box-shadow: 0 0px 5px 2px var(--color-effect-A);
    transition: 200ms all ease;
  }

  button.alt:hover {
    box-shadow: 0 0px 5px 2px var(--color-background-B);
  }
  
  button:active {
    background-color: var(--color-effect-A);
    transform: scale(1.05);
    transition: 50ms all ease;
  }

  button.alt:active {
    background-color: var(--color-background-B);
  }
</style>