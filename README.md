# Kogify

Kogify is a web application intended to provide statistics from Spotify playlists through its API.

## Configure .env

```
PUBLIC_SPOTIFY_CLIENT_ID= application public spotify client id, in order to work with the API
PUBLIC_REDIRECT_URL= configured redirect url, very important for the API validation
PUBLIC_POLICIES= space separated enabled policies, possible values are typed at /lib/policy.ts
```