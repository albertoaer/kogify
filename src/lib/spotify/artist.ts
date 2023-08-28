import { from, map, switchMap } from "rxjs";
import { spotifyRequest, type SessionProvider } from "./base";

export interface Artist {
  genres: string[],
  name: string,
  id: string,
  external_urls: {
    spotify: string
  },
  uri: string,
  images: {
    url: string
  }[],
  popularity: number,
  followers: {
    total: number
  }
  type: 'artist'
}

export function getArtist(provider: SessionProvider, id: string) {
  const artist$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<Artist>(session, `v1/artists/${id}`)))
  )
  
  return {
    artist$
  }
}

interface SeveralArtists {
  artists: Artist[]
}

export function getSeveralArtists(provider: SessionProvider, ids: string[]) {
  if (ids.length > 50) throw new Error('too much artists');
  if (ids.length < 1) throw new Error('expecting at least one artist');
  const artists$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<SeveralArtists>(session, 'v1/artists', {
      params: {
        'ids': ids.join(',')
      }
    }))),
    map(x => x.artists)
  )
  
  return {
    artists$
  }
}