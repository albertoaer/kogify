<script>
  import { manageUser } from "$lib/spotify";
	import { SpotifyAuth } from "$lib/spotify/auth";
	import { Header } from "$lib/components";
	import { SvelteSpotifyAuthHelper } from "$lib/utils/svelte_spotify_auth";
	import { setContext } from "svelte";
	import { APP_TITLE, DEFAULT_THEME, SPOTIFY_PERMISSIONS } from "$lib/constants";

  const helper = new SvelteSpotifyAuthHelper();
  const auth = new SpotifyAuth(helper);
  
  setContext('spotify_auth_helper', helper);

  const login = auth.perform(SPOTIFY_PERMISSIONS);
</script>

{#await login}
  <h1>Loading...</h1>
{:then}
  <Header title={APP_TITLE} manager={manageUser(helper)} />

  <div id="content">
    <slot />
  </div>
{/await}

<svelte:head>
  <link rel="stylesheet" href={DEFAULT_THEME}>
</svelte:head>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--color-light-B);
  }

  #content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>