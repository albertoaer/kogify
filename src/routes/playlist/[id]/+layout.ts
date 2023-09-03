import { getTracksOf, getMyPlaylists, type Playlist, type Track, type TrackArtist } from '$lib/spotify';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs';
import { Stats1D } from '$lib/statistics';
import { getSeveralArtists } from '$lib/spotify/artist.js';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params, parent }) => {
  const { id } = params;
  const { provider } = await parent();

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
    playlistGenres$
  }
}