<script lang="ts">
  import { Button, ChartPanel, Link, Panel, Row, Tags, Separator, Break } from '$lib/components';
	import type { Playlist, TrackArtist } from '$lib/spotify';
	import type { Stats1D } from '$lib/statistics';
	import { goto } from '$app/navigation';
	import { AppLinkLabel, PageLinkLabel } from '$lib/constants';

  export let data;

  const { id, playlist$, stats$, playlistGenres$ } = data;

  let playlist: Playlist | undefined = undefined;
  $: playlist = $playlist$;

  let playlistGenres: string[] = [];
  $: playlistGenres = $playlistGenres$;

  let stats: Stats1D<TrackArtist> | undefined;
  let avgSongs: number = 0;
  let underAvgList: Stats1D<TrackArtist[]>;
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
  }

  const label = 'Artists appearance';

  function handleInspect(items: TrackArtist[]) {
    goto(`/playlist/${id}/filter?artists=${items.map(x => x.id).join(',')}`);
  }

  function inspectAll() {
    goto(`/playlist/${id}/filter`);
  }

  function inspectOne(event: CustomEvent<{ title: string, item: TrackArtist }>) {
    handleInspect([event.detail.item])
  }

  function inspectMany(event: CustomEvent<{ title: string, item: TrackArtist[] }>) {
    handleInspect(event.detail.item)
  }
</script>

{#if playlist}
  <Panel flex='1 1 18em'>
    <Row justify='start' gap='1em'><h3>Genres</h3><Button>See them calculated</Button></Row>
    <Tags tags={playlistGenres}/>
    <Separator />
    <Link href={playlist.external_urls.spotify} blank>{PageLinkLabel}</Link>
    <Link href={playlist.uri}>{AppLinkLabel}</Link>
    <Button on:click={inspectAll}>Song count: {playlist.tracks.total}</Button>
  </Panel>
  <Panel flex='2 1 18em'>
    {#if stats}
      <div>
        <Row justify='start' gap='1em'><h3>Artists</h3><Button>See them ranked</Button></Row>
        <Tags tags={stats.top(15).collectMap(x => x.label).concat('and more...')} />
      </div>
    {/if}
    {#if playlist.description}
      <Separator />
      <div>
        <h3>About</h3>
        <Row justify='start'>{playlist.description}</Row>
      </div>
    {/if}
  </Panel>
{/if}
{#if stats}
  <Break />
  <ChartPanel
    type='bar'
    data={stats.top(10)}
    {label}
    on:click={inspectOne}
    overrideScales
  />
  {#if !Number.isNaN(avgSongs) && underAvgList.count}
    <ChartPanel
      type='pie'
      data={underAvgList}
      {label}
      on:click={inspectMany}
    />
  {/if}
  <ChartPanel
    type='bar'
    data={stats.group('artists')}
    {label}
    on:click={inspectMany}
    overrideScales
  />
{/if}