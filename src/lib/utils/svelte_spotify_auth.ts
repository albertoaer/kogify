import { PUBLIC_REDIRECT_URL, PUBLIC_SPOTIFY_CLIENT_ID } from '$env/static/public';
import type { AuthNotifier } from '$lib/spotify';
import { AUTH_KEYS, type SpotifyAuthHelper, type AuthKey } from '$lib/spotify/auth';
import { BehaviorSubject, Observable, distinctUntilChanged, filter } from 'rxjs';

export class SvelteSpotifyAuthHelper implements SpotifyAuthHelper, AuthNotifier {
  static subject = new BehaviorSubject(localStorage.getItem(AUTH_KEYS.session));
  static observable = (this.subject as Observable<string>).pipe(filter(x => !!x), distinctUntilChanged());

  getClientId(): string {
    return PUBLIC_SPOTIFY_CLIENT_ID;
  }
  
  getRedirectURL(): string {
    return PUBLIC_REDIRECT_URL;
  }
  
  getURL(): string {
    return window.location.href;
  }
  
  navigate(url: string): void {
    window.location.href = url;
  }
  
  setPersistent(key: AuthKey, value: string): void {
    localStorage.setItem(key, value);
    if (key === AUTH_KEYS.session)
      SvelteSpotifyAuthHelper.subject.next(value);
  }

  getPersistent(key: AuthKey): string | null {
    return localStorage.getItem(key);
  }

  clearAuth(): void {
    Object.values(AUTH_KEYS).forEach(x => localStorage.removeItem(x));
    window.location.pathname = '/';
  }

  getTokenObserver(): Observable<string> {
    return SvelteSpotifyAuthHelper.observable;
  }
}
