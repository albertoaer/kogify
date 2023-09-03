<script lang="ts">
	import Link from "./link.svelte";

  export let tags: (string | [string, string])[];
  export let background: boolean = false;
</script>

<ul class="tags" class:background>
  {#each tags as genre}
    {#if typeof genre === 'string'}
      <li>{genre}</li>
    {:else}
      <Link href={genre[1]}>{genre[0]}</Link>
    {/if}
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5em;
    row-gap: 1em;
    margin: 0;
    padding: 0;
    color: var(--color-text-B);
  }

  li {
    list-style: none;
    border-radius: 5px;
    margin: 0;
    padding: 0;
  }
  
  ul.background li {
    background-color: var(--color-effect-A);
  }
</style>