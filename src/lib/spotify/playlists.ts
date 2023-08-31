import { from, map, startWith, switchMap } from "rxjs";
import { spotifyRequest, type Image, type SessionProvider, type IterableResponse } from "./base";

export interface Playlist {
  description: string,
  id: string,
  images: Image[],
  name: string,
  external_urls: {
    spotify: string
  },
  tracks: {
    href: string,
    total: number
  },
  uri: string,
  type: 'playlist'
}

export function getMyPlaylists(provider: SessionProvider) {
  const myPlaylists$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<IterableResponse<Playlist>>(session, 'v1/me/playlists'))),
    map(x => x.items),
    startWith([] as Playlist[])
  );

  return {
    myPlaylists$
  }
}