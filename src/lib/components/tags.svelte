<script lang="ts">
  export let tags: (string | [string, string])[];
  export let background: boolean = false;
</script>

<ul class="tags" class:background>
  {#each tags as genre}
    <li>{genre}</li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    align-items: center;
    justify-content: space-between;
    margin: 0;
  }

  li {
    list-style: none;
    margin: 0.2em;
    border-radius: 5px;
    padding: 0.4em;
  }
  
  ul.background li {
    background-color: var(--color-strong-B);
  }
</style>