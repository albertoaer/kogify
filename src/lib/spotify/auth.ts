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
  return urlParams.get(CODE_PARAM_NAME);
}

export interface AccessData {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  token_type: string
}

export async function requestAccessData(
  clientId: string,
  code: string,
  codeVerifier: string,
  redirect: string
): Promise<AccessData | null> {
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

  return json as AccessData;
}

export async function refreshAccessData(clientId: string, refreshToken: string): Promise<AccessData | null> {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId
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

  return json as AccessData;
}

export const CODE_PARAM_NAME = 'code';

export const AUTH_KEYS = {
  access_token: 'access_token',
  code_verifier: 'code_verifier',
  refresh_token: 'refresh_token'
} as const;

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

export interface SpotifyAuthOptions {
  preventiveRefresh: boolean
}

export class SpotifyAuth {
  constructor(
    private readonly helper: SpotifyAuthHelper,
    private readonly permissions: string[] | string,
    private readonly opts?: SpotifyAuthOptions
  ) { }

  private collectPermissions(): string {
    return Array.isArray(this.permissions) ? this.permissions.join(' ') : this.permissions;
  }

  private storeAccess(accessData: AccessData) {
    this.helper.setPersistent('refresh_token', accessData.refresh_token);
    this.helper.setPersistent('access_token', accessData.access_token);
  }

  private async tryRefreshToken(): Promise<boolean> {
    const refreshToken = this.helper.getPersistent('refresh_token');
    if (refreshToken) {
      const data = await refreshAccessData(this.helper.getClientId(), refreshToken);
      if (data) this.storeAccess(data);
      return !!data;
    }
    return false;
  }

  async performAuth(): Promise<void> {
    if (this.helper.getPersistent('access_token')) {
      if (this.opts?.preventiveRefresh) this.tryRefreshToken();
      return;
    }

    const code = getCodeFromURL(this.helper.getURL());

    if (!code) {
      const output = await beginAuthorization(
        this.helper.getClientId(),
        this.helper.getRedirectURL(),
        this.collectPermissions()
      );
      this.helper.setPersistent('code_verifier', output.codeVerifier);
      this.helper.navigate(output.url);
    } else {
      const codeVerifier = this.helper.getPersistent('code_verifier');
      if (!codeVerifier) return;
      const accessData = await requestAccessData(
        this.helper.getClientId(),
        code,
        codeVerifier,
        this.helper.getRedirectURL()
      );
      if (accessData) this.storeAccess(accessData);
    }
  }

  async performAuthSolve(): Promise<void> {
    if (!await this.tryRefreshToken()) {
      this.helper.clearAuth();
      await this.performAuth();
    }
  }
}