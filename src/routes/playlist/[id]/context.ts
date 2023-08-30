import { SESSION_PROVIDER_KEY } from '$lib/constants';
import { getTracksOf, getMyPlaylists, type Playlist, type Track, type TrackArtist } from '$lib/spotify/playlists';
import type { SvelteSpotifySessionProvider } from '$lib/svelte_spotify_auth.js';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs';
import { getContext, setContext } from 'svelte';
import { Stats1D } from '$lib/statistics';
import { getSeveralArtists } from '$lib/spotify/artist.js';
import { writable } from 'svelte/store';

export interface InspectData {
  title: string,
  ids: string[]
}

export function buildContext(id: string) {
  const provider: SvelteSpotifySessionProvider = getContext(SESSION_PROVIDER_KEY);

  const playlist$ = getMyPlaylists(provider).myPlaylists$.pipe(
    map((list: Playlist[]) => list.find(x => x.id === id) as Playlist),
    filter(x => x !== undefined),
    shareReplay(1)
  );

  const tracks$ = playlist$.pipe(
    switchMap(x => getTracksOf(provider, x).playlistTracks$),
    startWith([] as Track[]),
    shareReplay(1)
  );

  const stats$ = tracks$.pipe(
    map(
      x => Stats1D.buildFrom(x.flatMap(x => x.artists.map(x => [x.name, x] as [string, TrackArtist])))
    ),
    shareReplay(1)
  );
  
  const playlistGenres$ = stats$.pipe(
    filter(stats => stats.count > 0),
    switchMap(stats => getSeveralArtists(provider, stats.top(50).collect().map(x => x.id)).artists$.pipe(
      map(artists => Stats1D.buildFrom(
        artists.map(artist => artist.genres.map(genre => [genre, genre] as [string, string])).flat()
      ))
    )),
    map(x => x.top(10).collect()),
    startWith([] as string[]),
    shareReplay(1)
  );

  return {
    id,
    playlist$,
    stats$,
    tracks$,
    playlistGenres$,
    inspectData$: writable<InspectData | undefined>(undefined)
  }
}

export type Context = ReturnType<typeof buildContext>;

export function createContext(id: string) {
  setContext('playlist', buildContext(id));
}

export function currentContext() {
  return getContext('playlist') as Context;
}