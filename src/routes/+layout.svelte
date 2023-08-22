<script>
  import { manageUser } from "$lib/spotify";
	import { SpotifyAuth } from "$lib/spotify/auth";
	import { Header } from "$lib/components";
	import { SvelteSpotifyAuthHelper, SvelteSpotifySessionProvider } from "$lib/utils/svelte_spotify_auth";
	import { setContext } from "svelte";
	import { APP_TITLE, DEFAULT_THEME, SESSION_PROVIDER_KEY, SPOTIFY_PERMISSIONS } from "$lib/constants";

  const helper = new SvelteSpotifyAuthHelper();
  const auth = new SpotifyAuth(helper, SPOTIFY_PERMISSIONS, {
    preventiveRefresh: true
  });
  
  const sessionProvider = new SvelteSpotifySessionProvider(auth, helper);

  setContext(SESSION_PROVIDER_KEY, sessionProvider);

  const login = auth.performAuth();
</script>

{#await login}
  <h1>Loading...</h1>
{:then}
  <Header title={APP_TITLE} manager={manageUser(sessionProvider)} />

  <slot />
{/await}

<svelte:head>
  <link rel="stylesheet" href={DEFAULT_THEME}>
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
    background-color: var(--color-light-B);
  }
</style>