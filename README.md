# Kogify

Kogify is a web application that aims to provide statistics from Spotify playlists through its official API. At the moment is only planned to work with Playlist of *Tracks*, by default *Episodes* will be ignored. Kogify is developed using [SvelteKit](https://kit.svelte.dev/).

## Features

- Retrieve the user's top artists
- Retrieve the personal and followed playlists of the user
- Provide playlist description, calculated genres (estimated with the genres extracted from the artists) and average track popularity
- Show statistics of several aspects calculated by each artists' song count
- Show artist basic information, including: picture, top tracks, popularity and genres

# Self-host Kogify

Kogify is open source and intended to be self-hosted by anyone that would like to see their spotify statistics and their playlists' statistics

You must have an Spotify app created in the Spotify API dashboard, the only requirements is to have the account verified. Once this step is done, just pick the `Client Id` and configure the `Redirect URL` in the dashboard.

## Configure .env

```
PUBLIC_SPOTIFY_CLIENT_ID= application public spotify client id, in order to work with the API
PUBLIC_REDIRECT_URL= configured redirect url, very important for the API validation
PUBLIC_POLICIES= space separated enabled policies, possible values are typed at /lib/policy.ts
```

## Build

After you have configured the environment, you can build the application with the SvelteKit [adapter](https://kit.svelte.dev/docs/adapters) that best suits your project. Finally build the application:

```sh
npm run build
```