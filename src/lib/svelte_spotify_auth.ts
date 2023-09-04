import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import type { SessionProvider, SessionState } from '$lib/spotify';
import { AUTH_KEYS, type SpotifyAuthHelper, type AuthKey, type SpotifyAuth } from '$lib/spotify/auth';
import { Observable, ReplaySubject, distinctUntilChanged, filter, map } from 'rxjs';

export class SvelteSpotifyAuthHelper implements SpotifyAuthHelper {
  static readonly subject$ = new ReplaySubject(1);
  static readonly observable$ = (this.subject$ as Observable<string>).pipe(filter(x => !!x), distinctUntilChanged());

  getClientId(): string {
    return env.PUBLIC_SPOTIFY_CLIENT_ID;
  }
  
  getRedirectURL(): string {
    return env.PUBLIC_REDIRECT_URL;
  }
  
  getURL(): string {
    return window.location.href;
  }
  
  navigate(url: string): void {
    window.location.href = url;
  }
  
  setPersistent(key: AuthKey, value: string): void {
    localStorage.setItem(key, value);
    if (key === AUTH_KEYS.access_token) {
      SvelteSpotifyAuthHelper.subject$.next(value);
      goto('/');
    }
  }

  getPersistent(key: AuthKey): string | null {
    return localStorage.getItem(key);
  }

  clearAuth(): void {
    Object.values(AUTH_KEYS).forEach(x => localStorage.removeItem(x));
    window.location.pathname = '/';
  }

  getTokenObserver(): Observable<string> {
    return SvelteSpotifyAuthHelper.observable$;
  }
}

export class SvelteSpotifySessionProvider implements SessionProvider {
  private readonly observable$: Observable<SessionState>;

  constructor(auth: SpotifyAuth, helper: SvelteSpotifyAuthHelper) {
    const fixAuth = auth.performAuthSolve.bind(auth);
    const killSession = helper.clearAuth.bind(helper);
    this.observable$ = helper.getTokenObserver().pipe(map(accessToken => {
      return {
        accessToken,
        fixAuth,
        killSession
      }
    }));
  }

  getSession(): Observable<SessionState> {
    return this.observable$;
  }
}