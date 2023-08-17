function generateRandomString(length: number) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  const digestBytes = [...new Uint8Array(digest)];
  const hasBuffer = typeof Buffer !== 'undefined';

  const digestAsBase64 = hasBuffer
      ? Buffer.from(digest).toString('base64')
      : btoa(String.fromCharCode.apply(null, digestBytes));

  return digestAsBase64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

export interface BeginAuthorizationOutput {
  url: string,
  codeVerifier: string
}

export async function beginAuthorization(clientId: string, redirect: string, scope: string): Promise<BeginAuthorizationOutput> {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const state = generateRandomString(16);

  const args = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirect,
    state: state,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  return {
    url: 'https://accounts.spotify.com/authorize?' + args,
    codeVerifier
  }
}

export function getCodeFromURL(url: string): string | null {
  const urlParams = new URL(url).searchParams;
  return urlParams.get('code');
}

export async function requestToken(clientId: string, code: string, codeVerifier: string, redirect: string): Promise<string | null> {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect,
    client_id: clientId,
    code_verifier: codeVerifier
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  const json = await response.json();

  if (!json.access_token) return null;

  return json.access_token
}

export const PERMISSIONS = ['user-read-private', 'user-read-email'] as const;

export type Permission = typeof PERMISSIONS[number];

export const AUTH_KEYS = { session: 'session', code_verifier: 'code_verifier' } as const;

export type AuthKey = typeof AUTH_KEYS[keyof typeof AUTH_KEYS];

export interface SpotifyAuthHelper {
  getClientId(): string;
  getRedirectURL(): string;
  getURL(): string;
  navigate(url: string): void;
  setPersistent(key: AuthKey, value: string): void;
  getPersistent(key: AuthKey): string | null;
  clearAuth(): void;
}

export class SpotifyAuth {

  constructor(private readonly helper: SpotifyAuthHelper) { }

  async perform(permissions: Permission[]): Promise<void> {
    if (this.helper.getPersistent('session')) return;

    const code = getCodeFromURL(this.helper.getURL());

    if (!code) {
      const output = await beginAuthorization(this.helper.getClientId(), this.helper.getRedirectURL(), permissions.join(' '));
      this.helper.setPersistent('code_verifier', output.codeVerifier);
      this.helper.navigate(output.url);
    } else {
      const codeVerifier = this.helper.getPersistent('code_verifier');
      if (!codeVerifier) return;
      const token = await requestToken(this.helper.getClientId(), code, codeVerifier, this.helper.getRedirectURL());
      if (!token) return;
      this.helper.setPersistent('session', token);
    }
  }
}