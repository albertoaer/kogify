<script lang="ts">
</script>

<button on:click>
  <slot />
</button>

<style>
  button {
    margin: 0;
    border: none;
    color: var(--color-light-A);
    background-color: var(--color-strong-B);
    font-size: inherit;
    padding: 0.45em 0.6em;
    cursor: pointer;
    outline: none;
    border-radius: 5px;
    box-shadow: 0 0px 1px 0px var(--color-light-A);
    transition: 200ms all ease;
  }
  
  button:hover {
    background-color: var(--color-strongest);
    box-shadow: 0 0px 5px 2px var(--color-strong-B);
    transition: 200ms all ease;
  }
  
  button:active {
    transform: scale(1.05);
    transition: 50ms all ease;
  }
</style>