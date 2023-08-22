<script lang="ts">
	import { Card } from ".";

  export let image: string;
  export let name: string;
</script>

<div id="main">
  <Card src={image} {name} rounded size="20em" shadow="4px 2px 10px 0px black" />
  <div id="info">
    <h1 class="center">{name}</h1>
    <slot name="info" />
  </div>
  <div id="content">
    <slot name="content" />
  </div>
  <div id="more">
    <slot name="more" />
  </div>
</div>

<style>
  .center {
    text-align: center;
  }

  #main {
    margin: 2em 1em;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    width: max(70%, 400px);
    flex-wrap: wrap;
    gap: 1em;
  }

  #info, #content, #more {
    color: var(--color-light-A);
    background-color: var(--color-strongest);
    border-radius: 5px;
    padding: 0 1.5em;
    margin: 0;
  }

  #info {
    flex-basis: max(30%, 400px);
    flex-grow: 1;
    height: 20em;
    overflow-y: auto;
    overflow-x: hidden;
  }

  #content, #more {
    flex-grow: 1;
    flex-basis: 100%;
    max-width: 100%;
  }
</style>