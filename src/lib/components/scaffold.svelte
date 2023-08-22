<script lang="ts">
	import { Container, Card } from ".";

  export let image: string | undefined = undefined;
  export let name: string;
</script>

<Container>
  <div id="main">
    {#if image}
    <Card src={image} {name} rounded size="20em" shadow="4px 2px 10px 0px black" />
    {/if}
    <slot />
  </div>
</Container>

<style>
  #main {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    width: max(70%, 450px);
    flex-wrap: wrap;
    gap: 1em;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 500px) {
    #main {
      width: 100%;
    }
  }
</style>