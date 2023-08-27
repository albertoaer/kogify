<script lang="ts">
  export let index: number | undefined = undefined;
  export let title: string;
  export let href: string = "";
  export let authors: [string, string][] = [];
</script>

<li>
  {#if index !== undefined}
    <span>{index+1}. </span>
  {/if}
  <a {href} id="title">{title}</a>
  <div id="options">
    <slot />
  </div>
  {#if authors.length}
    <ul id="authors">
      {#each authors as [author, href]}
        <a {href}>{author}</a>
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

  #options {
    display: inline-block;
    margin: 0;
    padding: 0;
    font-size: 0.6em;
    margin-left: 1em;
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