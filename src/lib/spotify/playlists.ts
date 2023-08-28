import { Observable, concat, from, map, of, startWith, switchMap } from "rxjs";
import { spotifyRequest, type Image, type SessionProvider, type IterableResponse } from "./base";

export interface Playlist {
  description: string,
  id: string,
  images: Image[],
  name: string,
  external_urls: {
    spotify: string
  },
  tracks: {
    href: string,
    total: number
  },
  uri: string,
  type: 'playlist'
}

export function manageMyPlaylists(provider: SessionProvider) {
  const myPlaylists$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<IterableResponse<Playlist>>(session, 'v1/me/playlists'))),
    map(x => x.items),
    startWith([] as Playlist[])
  );

  return {
    myPlaylists$
  }
}

export interface TrackAlbum {
  album_type: string,
  total_tracks: number,
  href: string,
  id: string,
  name: string,
  release_date: string,
  album_group: string
}

export interface TrackArtist {
  href: string,
  id: string,
  name: string,
  uri: string,
}

export interface Track {
  name: string,
  duration_ms: number,
  popularity: number,
  preview_url: string,
  id: string,
  album: TrackAlbum,
  artists: TrackArtist[]
  type: 'track'
}

const TRACK_FIELDS = `href,limit,next,offset,previous,total,items(track(name,popularity,duration_ms,preview_url,id,
album(album_type,total_tracks,href,id,name,release_date,album_group),artists,type))`

function getRecursiveTracksOf(provider: SessionProvider, href: string, array: Track[], params?: Record<string, string>): Observable<Track[]> {
  return provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<IterableResponse<{ track: Track }>>(
      session, href, { params }
    ))),
    switchMap(result => {
      array.push(...result.items.map(x => x.track));
      if (!result.next) return of(array);
      return concat(of(array), getRecursiveTracksOf(provider, result.next, array));
    }),
  );
}

export function getTracksOf(provider: SessionProvider, playlist: Playlist) {
  const playlistTracks$ = getRecursiveTracksOf(provider, playlist.tracks.href, [], { 'fields': TRACK_FIELDS, 'limit': '50' }).pipe(
    startWith([] as Track[])
  );
  return {
    playlistTracks$
  };
}

export type MyPlaylistsManager = ReturnType<typeof manageMyPlaylists>;