import type { Observable } from "rxjs";

export async function spotifyRequest<K>(accessToken: string, endpoint: string, body?: Record<string, string>): Promise<K> {
  const response = await fetch('https://api.spotify.com/' + endpoint, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    },
    body: body ? JSON.stringify(body) : undefined
  });

  return await response.json()
}

export interface AuthNotifier {
  getTokenObserver(): Observable<string>
}