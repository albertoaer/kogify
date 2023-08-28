import type { Observable } from "rxjs";

const BASE_ADDRESS = 'https://api.spotify.com/';

export async function spotifyRequest<K>(
  session: SessionState,
  endpoint: string,
  opts?: { params?: Record<string, string>, body?: Record<string, string> }
): Promise<K> {
  let address = endpoint.startsWith(BASE_ADDRESS) ? endpoint : BASE_ADDRESS + endpoint;

  const body = opts?.body;
  const params = opts?.params;

  if (params) address += '?' + new URLSearchParams(params);

  const request = (token: string) => fetch(address, {
    headers: {
      Authorization: 'Bearer ' + token
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'force-cache'
  });

  const response = await request(session.accessToken);
  if (response.status === 200) return response.json();

  const rateLimit = () => { throw new Error('Exceeded rate limit') }
  if (response.status === 429) rateLimit();

  if (response.status === 401 || response.status === 403) {
    await session.fixAuth();
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