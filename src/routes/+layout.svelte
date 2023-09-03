<script>
	import { Header } from "$lib/components";
	import { APP_TITLE, DEFAULT_THEME } from "$lib/constants";

  export let data;
  
  const { user, login } = data;
  
</script>

{#await login}
  <h1>Loading...</h1>
{:then}
  <Header {user} />
  <slot />
{/await}

<svelte:head>
  <link rel="stylesheet" href={DEFAULT_THEME}>
  <title>{APP_TITLE}</title>
</svelte:head>

<style>
  :global(html) {
    box-sizing: border-box;
  }

  :global(*, *:before, *:after) {
    box-sizing: inherit;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    background: var(--color-background-A);
    background: linear-gradient(220deg, var(--color-background-B) 0%, var(--color-background-A) 40%, var(--color-background-A) 80%, var(--color-background-B) 100%);
    background-attachment: fixed;
    color: var(--color-text-A);
  }
</style>