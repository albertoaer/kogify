<script lang="ts">
  interface WithLink<T> {
    value: T,
    href: string
  }

  export let index: number | undefined = undefined;
  export let item: WithLink<string>;
  export let authors: WithLink<string>[];
</script>

<li>
  {#if index !== undefined}
    <span>{index+1}. </span>
  {/if}
  <a href={item.href} id="title">
    {item.value}
  </a>
  {#if authors.length}
    <ul id="authors">
      {#each authors as author}
        <a href={author.href}>
          {author.value}
        </a>
      {/each}
    </ul>
  {/if}
</li>

<style>
  li {
    margin-bottom: 1.4em;
    list-style: none;
  }

  a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    padding: 0;
    margin: 0;
  }

  a:hover {
    text-decoration: underline;
  }

  #authors {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0 1em;
    margin: 0;
    padding: 0;
    margin-top: 0.2em;
    color: var(--color-light-B);
    justify-content: left;
  }
</style>