import { map, from, mergeMap, first, filter, switchMap, startWith } from 'rxjs';
import { spotifyRequest, type AuthNotifier } from './base';

export interface UserResult {
  display_name: string | null,
  images: {
    url: string
  }[]
}

export function manageUser(auth: AuthNotifier) {
  const userData$ = auth.getTokenObserver().pipe(switchMap(token => from(spotifyRequest<UserResult>(token, 'v1/me'))));

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
  images: {
    url: string
  }[],
  popularity: number
}

export interface Top<K> {
  items: K[]
}

export function manageTopArtists(auth: AuthNotifier) {
  const topArtistData$ = auth.getTokenObserver().pipe(
    switchMap(token => from(spotifyRequest<Top<TopArtist>>(token, 'v1/me/top/artists'))),
    map(x => x.items),
    startWith([])
  );

  return  {
    topArtistData$
  }
}

export type UserTopArtists = ReturnType<typeof manageTopArtists>;