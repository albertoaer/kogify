<script lang="ts">
  import { Button, ExpandablePanel, SongList, ChartPanel, DescriptionPanel } from '$lib/components';
	import type { Playlist, TrackArtist } from '$lib/spotify';
	import type { Stats1D } from '$lib/statistics';
	import { goto } from '$app/navigation';

  export let data;

  const { id, playlist$, stats$, tracks$, inspectData$, playlistGenres$ } = data;

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

  function handleInspect(title: string, items: TrackArtist[]) {
    inspectData$.set({
      title,
      ids: items.map(x => x.id)
    });
    goto(`/playlist/${id}/inspect`);
  }

  function inspectAll() {
    inspectData$.set(undefined);
    goto(`/playlist/${id}/inspect`);
  }

  function inspectOne(event: CustomEvent<{ title: string, item: TrackArtist }>) {
    handleInspect(event.detail.title, [event.detail.item])
  }

  function inspectMany(event: CustomEvent<{ title: string, item: TrackArtist[] }>) {
    handleInspect(event.detail.title, event.detail.item)
  }
</script>

{#if playlist}
  <DescriptionPanel
    title={playlist.name}
    pageLink={playlist.external_urls.spotify}
    appLink={playlist.uri}
    tags={playlistGenres}
  >
    <Button on:click={inspectAll}>Songs: {playlist.tracks.total}</Button>
    <p>{playlist.description}</p>
  </DescriptionPanel>
{/if}
{#if stats}
  <ChartPanel
    title="Top 10"
    type='bar'
    data={stats.top(10)}
    {label}
    on:click={inspectOne}
    overrideScales
  />
  {#if !Number.isNaN(avgSongs) && underAvgList.count}
    <ChartPanel
      title="Less than average songs ({avgSongs} song{avgSongs > 1 ? 's' :''}):"
      type='pie'
      data={underAvgList}
      {label}
      on:click={inspectMany}
    />
  {/if}
  <ChartPanel
    title="By number of songs"
    type='bar'
    data={stats.group('artists')}
    {label}
    on:click={x => handleInspect(x.detail.title, x.detail.item)}
    overrideScales
  />
{/if}
<ExpandablePanel title="Song list" base={100} bigPanel>
  <Button on:click={inspectAll} slot="title-content">All songs</Button>
  <SongList tracks={$tracks$} />
</ExpandablePanel>