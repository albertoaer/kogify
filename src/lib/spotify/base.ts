import type { Observable } from "rxjs";

export async function spotifyRequest<K>(
  provider: SessionState,
  endpoint: string,
  body?: Record<string, string>
): Promise<K> {
  const request = (token: string) => fetch('https://api.spotify.com/' + endpoint, {
    headers: {
      Authorization: 'Bearer ' + token
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const response = await request(provider.accessToken);
  if (response.status === 200) return response.json();

  const rateLimit = () => { throw new Error('Exceeded rate limit') }
  if (response.status === 429) rateLimit();

  if (response.status === 401 || response.status === 403) {
    await provider.fixAuth();
  }

  throw new Error('Unknown status code');
}

export interface SessionState {
  accessToken: string,
  fixAuth(): Promise<void>
  killSession(): void;
}

export interface SessionProvider {
  getSession(): Observable<SessionState>
}

export interface Image {
  url: string,
  height: number,
  width: number
}

export interface IterableResponse<K> {
  href: string,
  next: string | null,
  previous: string | null,
  total: number,
  offset: number,
  limit: number,
  items: K[]
}