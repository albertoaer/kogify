import { getTopArtists, type Artist } from '$lib/spotify';
import { getArtist } from '$lib/spotify/artist.js';
import { map, of, switchMap } from 'rxjs';

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { id } = params;
  const { provider } = await parent();

  const artist$ = getTopArtists(provider).topArtistData$.pipe(
    map((list: Artist[]) => list.find(x => x.id === id) as Artist),
    switchMap(artist => {
      if (artist) return of(artist);
      return getArtist(provider, id).artist$;
    })
  );
  
  return {
    artist$
  };
}