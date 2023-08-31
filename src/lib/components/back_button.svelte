<script lang="ts">
	import { Button } from ".";
  import Icon from '@iconify/svelte';

  let active = false;
</script>

<Button on:mouseover={_ => active = true} on:mouseout={_ => active = false} on:click={_ => history.back()}>
  <div class:active>
    {#if active}
      Back
    {:else}
      <Icon icon="ic:outline-keyboard-backspace" width="28" />
    {/if}
  </div>
</Button>

<style>
  @keyframes opacity {
    0% { opacity: 0.2; }
    100% { opacity: 1; }
  }

  div {
    width: 1.5em;
    height: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.active {
    animation-name: opacity;
    animation-duration: 1.5s;
    animation-delay: 0s;
  }
</style>