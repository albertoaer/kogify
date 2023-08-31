import { map, from, mergeMap, first, filter, switchMap } from 'rxjs';
import { spotifyRequest, type SessionProvider, type Image } from './base';

export interface UserProfile {
  display_name: string | null,
  images: Image[]
}

export function getUser(provider: SessionProvider) {
  const userData$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<UserProfile>(session, 'v1/me')))
  );

  return {
    userData$,
    profilePicture$: userData$.pipe(
      filter((x: UserProfile) => x.images && x.images.length > 0),
      mergeMap((x: UserProfile) => from(x.images).pipe(first(), map(x => x.url))),
    ),
    displayName$: userData$.pipe(map(x => x.display_name))
  };
}

export type UserManager = ReturnType<typeof getUser>;