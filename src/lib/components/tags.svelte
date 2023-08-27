<script lang="ts">
  export let tags: (string | [string, string])[];
</script>

<ul class="tags">
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
  }

  li {
    list-style: none;
    margin: 0.2em;
    border-radius: 5px;
    background-color: var(--color-strong-B);
    padding: 0.4em;
  }
</style>