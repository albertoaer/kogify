import { map, from, mergeMap, first, filter, switchMap, startWith } from 'rxjs';
import { spotifyRequest, type SessionProvider, type IterableResponse, type Image } from './base';

export interface UserResult {
  display_name: string | null,
  images: Image[]
}

export function manageUser(provider: SessionProvider) {
  const userData$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<UserResult>(session, 'v1/me')))
  );

  return {
    userData$,
    profilePicture$: userData$.pipe(
      filter((x: UserResult) => x.images && x.images.length > 0),
      mergeMap((x: UserResult) => from(x.images).pipe(first(), map(x => x.url))),
    ),
    displayName$: userData$.pipe(map(x => x.display_name))
  };
}

export type UserManager = ReturnType<typeof manageUser>;

export interface TopArtist {
  genres: string[],
  name: string,
  id: string,
  images: {
    url: string
  }[],
  popularity: number,
  type: 'artist'
}

export function manageTopArtists(provider: SessionProvider) {
  const topArtistData$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<IterableResponse<TopArtist>>(session, 'v1/me/top/artists'))),
    map(x => x.items),
    startWith([] as TopArtist[])
  );

  return  {
    topArtistData$
  }
}

export type UserTopArtists = ReturnType<typeof manageTopArtists>;