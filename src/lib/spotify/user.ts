import { from, switchMap } from 'rxjs';
import { spotifyRequest, type SessionProvider, type Image } from './base';

export interface UserProfile {
  display_name: string | null,
  images: Image[],
  country: string
}

export function getUser(provider: SessionProvider) {
  const userData$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<UserProfile>(session, 'v1/me')))
  );

  return {
    userData$
  };
}

export type UserManager = ReturnType<typeof getUser>;