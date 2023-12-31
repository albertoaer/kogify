import { Observable, concat, from, map, of, startWith, switchMap } from "rxjs";
import { spotifyRequest, type IterableResponse, type SessionProvider } from "./base";
import type { Playlist } from "./playlists";
import type { Artist } from "./artist";

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

export function getTopTracks(provider: SessionProvider, artist: Artist, market: string) {
  const topTracks$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<{ tracks: Track[] }>(session, `v1/artists/${artist.id}/top-tracks`, { params: { market } }))),
    map(x => x.tracks),
    startWith([] as Track[])
  );
  return {
    topTracks$
  };
}

export function getMyTopTracks(provider: SessionProvider) {
  const myTopTracks$ = provider.getSession().pipe(
    switchMap(session => from(spotifyRequest<IterableResponse<Track>>(session, 'v1/me/tracks'))),
    map(x => x.items),
    startWith([] as Track[])
  );

  return {
    myTopTracks$
  }
}