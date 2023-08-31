export const ssr = false;

import { getMyPlaylists, getTopArtists, getUser, SpotifyAuth, type SessionProvider } from "$lib/spotify";
import { combineLatest, map } from "rxjs";
import { SvelteSpotifyAuthHelper, SvelteSpotifySessionProvider } from "$lib/svelte_spotify_auth";
import { SPOTIFY_PERMISSIONS } from "$lib/constants";
import type { LayoutLoad } from "./$types";

function homeData(provider: SessionProvider) {
  const { topArtistData$ } = getTopArtists(provider);
  const { myPlaylists$ } = getMyPlaylists(provider);

  return {
    cardData$: combineLatest([myPlaylists$, topArtistData$]).pipe(map(([a, b]) => [...a, ...b]))
  }
}

export const load: LayoutLoad = () => {
  const helper = new SvelteSpotifyAuthHelper();
  const auth = new SpotifyAuth(helper, SPOTIFY_PERMISSIONS, {
    preventiveRefresh: true
  });

  const provider = new SvelteSpotifySessionProvider(auth, helper);

  const user = getUser(provider);
  
  const login = auth.performAuth();

  return {
    provider,
    login,
    auth,
    user,
    ...homeData(provider)
  }
}