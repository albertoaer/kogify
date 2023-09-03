<script lang="ts">
  import { Button, Link, Panel, Row, Tags, Separator, SongList } from '$lib/components';
	import type { Playlist, Track, TrackArtist } from '$lib/spotify';
	import type { Stats1D } from '$lib/statistics';
	import { AppLinkLabel, PageLinkLabel } from '$lib/constants';
	import { goto } from '$app/navigation';

  export let data;

  const { id, playlist$, stats$, playlistGenres$, trackStats$ } = data;

  let playlist: Playlist | undefined = undefined;
  $: playlist = $playlist$;

  let playlistGenres: string[] = [];
  $: playlistGenres = $playlistGenres$;

  let stats: Stats1D<TrackArtist> | undefined;
  let avgSongs: number = 0;
  let underAvgList: Stats1D<TrackArtist[]>;
  let genres: [string, string][] = [];
  $: {
    stats = $stats$;
    avgSongs = stats.avg();
    underAvgList = stats.filter(({ value }) => value < avgSongs).group('artists').replaceMap(x => {
      return {
        label: `Artists with ${x.value} songs`,
        ref: x.ref,
        value: x.ref.length
      }; 
    });
    genres = stats.top(15).collectMap(x => [x.label, `/playlists/${id}/filter?artists=${x.ref.id}`] as [string, string]).concat([['and more...', `/playlists/${id}/artists`]]);
  }

  let trackStats: Stats1D<Track> | undefined;
  $: trackStats = $trackStats$;
</script>

{#if playlist}
  <Panel flex='1 1 18em'>
    <Row justify='start' gap='1em'><h3>Genres</h3><Button on:click={_ => goto(`/playlists/${id}/genres`)}>See them calculated</Button></Row>
    <Tags tags={playlistGenres}/>
    <Separator />
    <Link href={playlist.external_urls.spotify} blank>{PageLinkLabel}</Link>
    <Link href={playlist.uri}>{AppLinkLabel}</Link>
    <Button on:click={_ => goto(`/playlists/${id}/filter`)}>Song count: {playlist.tracks.total}</Button>
  </Panel>
  <Panel flex='2 1 18em'>
    {#if stats}
      <div>
        <Row justify='start' gap='1em'><h3>Artists</h3><Button on:click={_ => goto(`/playlists/${id}/artists`)}>Artist ranking</Button></Row>
        <Tags tags={genres} />
      </div>
    {/if}
    <Separator />
    {#if playlist.description}
      <div>
        <h3>About</h3>
        <Row justify='start'>{playlist.description}</Row>
      </div>
    {/if}
    {#if trackStats}
      <div>
        <Row justify='start' gap='1em'><h3>Popularity</h3><Button on:click={_ => goto(`/playlists/${id}/popularity`)}>Popularity ranking</Button></Row>
        <Row justify='start'>Average track popularity: {trackStats.avg()}%</Row>  
      </div>
    {/if}
  </Panel>
  {#if trackStats}
    <Panel title='Most popular tracks' flex="1 0 100%">
      <SongList tracks={trackStats.top(15).collectMap(x => x.ref)} />
    </Panel>
  {/if}
{/if}