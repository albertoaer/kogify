<script lang="ts">
  import { Button, Link, Row, Tags, SongList } from '$lib/components';
  import { Panel, Picture } from '$lib/components/scaffold';
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
  let artists: [string, string][] = [];
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
    artists = stats.top(15).collectMap(
      x => [x.label, `/playlists/${id}/filter?artists=${x.ref.id}`] as [string, string]
    ).concat([['and more...', `/playlists/${id}/artists`]]);
  }

  let trackStats: Stats1D<Track> | undefined;
  $: trackStats = $trackStats$;
</script>

{#if playlist}
  <Picture flex='0 1 auto'>
    <Row justify='space-around' width='100%'>
      <Link href={playlist.external_urls.spotify} blank>{PageLinkLabel}</Link>
      <Link href={playlist.uri}>{AppLinkLabel}</Link>
    </Row>
  </Picture>
  <Panel flex='0 1 50em' justify='stretch' rowGap='0.6em'>
    {#if playlist.description}
    <Panel title='About' titleStart titleTag='h3' flex='1 1 auto' padding='0 0 1em 0'>
      {playlist.description}
    </Panel>
    {/if}
    {#if stats}
      <Panel title='Artists' titleStart titleTag='h3' flex='1 1 auto' padding='0 0 1em 0'>
        <Tags tags={artists} />
        <Row><Button width='60%' on:click={_ => goto(`/playlists/${id}/artists`)}>Artists ranking</Button></Row>
      </Panel>
    {/if}
    <Panel title='Genres' titleStart titleTag='h3' flex='1 1 auto' padding='0 0 1em 0'>
      <Tags tags={playlistGenres}/>
    </Panel>
    <Row justify='space-between' wrap gap='2em'>
      {#if trackStats}
        <Panel title='Popularity' titleStart titleTag='h3' flex='1 1 auto' padding='0 0 1em 0'>
          <p style="margin: 0;">The average track popularity is <b>{trackStats.avg()}%</b></p>
        </Panel>
      {/if}
      <Panel title='Songs' titleStart titleTag='h3' flex='0 1 auto' padding='1em' shadow='0 0 12px 0 var(--color-text-B)'>
        <p style="margin: 0;">This playlist has <b>{playlist.tracks.total}</b> songs</p>
      </Panel>
    </Row>
  </Panel>
  {#if trackStats}
    <Panel title='Most popular tracks' flex="1 0 100%">
      <SongList tracks={trackStats.top(15).collectMap(x => x.ref)} />
    </Panel>
  {/if}
{/if}