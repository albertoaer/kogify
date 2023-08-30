<script lang="ts">
  export let alt: boolean = false;
</script>

<button on:click on:mouseover on:mouseout on:focus on:blur class:alt>
  <slot />
</button>

<style>
  button {
    margin: 0;
    border: 1px solid var(--color-strong-B);
    color: var(--color-light-A);
    background-color: var(--color-strongest);
    font-size: inherit;
    padding: 0.45em 0.6em;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    transition: 200ms all ease;
  }

  button.alt {
    border-color: var(--color-strong-A);
  }
  
  button:hover {
    background-color: var(--color-strongest);
    box-shadow: 0 0px 5px 2px var(--color-strong-B);
    transition: 200ms all ease;
  }

  button.alt:hover {
    box-shadow: 0 0px 5px 2px var(--color-strong-A);
  }
  
  button:active {
    background-color: var(--color-strong-B);
    transform: scale(1.05);
    transition: 50ms all ease;
  }

  button.alt:active {
    background-color: var(--color-strong-A);
  }
</style>