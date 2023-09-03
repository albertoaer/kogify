import { getTopArtists, type Artist, getTopTracks } from '$lib/spotify';
import { getArtist } from '$lib/spotify/artist.js';
import { combineLatest, map, of, switchMap } from 'rxjs';

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { id } = params;
  const { provider, user } = await parent();

  const artist$ = getTopArtists(provider).topArtistData$.pipe(
    map((list: Artist[]) => list.find(x => x.id === id) as Artist),
    switchMap(artist => {
      if (artist) return of(artist);
      return getArtist(provider, id).artist$;
    })
  );

  const topTracks$ = combineLatest([artist$, user.userData$]).pipe(switchMap(([artist, userData]) => getTopTracks(provider, artist, userData.country).topTracks$))
  
  return {
    artist$,
    topTracks$
  };
}