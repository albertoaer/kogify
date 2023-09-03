<script lang="ts">
	import { goto } from "$app/navigation";
	import { ChartPanel, Panel, PreparedChart, Separator } from "$lib/components";
	import type { TrackArtist } from "$lib/spotify";
	import type { Stats1D } from "$lib/statistics";

  export let data;

  const { id, stats$ } = data;

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
    genres = stats.top(15).collectMap(x => [x.label, `/artists/${x.ref.id}`] as [string, string]).concat([['and more...', `/playlist/${id}/artists`]]);
  }

  const label = 'Artists appearance';

  function handleInspect(items?: TrackArtist[]) {
    const params = items ? `?artists=${items.map(x => x.id).join(',')}` : '';
    goto(`/playlists/${id}/filter${params}`);
  }
</script>

{#if stats}
  <Panel title='Top 10 Artists'>
    <PreparedChart
      type='bar'
      data={stats.top(10)}
      {label}
      overrideScales
      on:click={x => handleInspect([x.detail.item])}
    />
  </Panel>
  <Panel>
    {#if stats.count === 1}
      <p>This playlist contains songs by only <b>1</b> artist</p>
    {:else}
      <p>This playlist contains songs by <b>{stats.count}</b> different artists</p>
      <Separator />
      <PreparedChart
        type='doughnut'
        data={stats}
        {label}
        on:click={x => handleInspect([x.detail.item])}
      />
    {/if}
  </Panel>
  {#if !Number.isNaN(avgSongs) && underAvgList.count}
    {#if underAvgList.count > 1}
      <ChartPanel
        type='doughnut'
        title='Artists with less than {avgSongs} songs'
        data={underAvgList}
        label='Artist count'
        on:click={x => handleInspect(x.detail.item)}
      />
    {/if}
  {/if}
  <Panel title='Artists by number of songs' flex='1 0 100%'>
    <PreparedChart
      type='line'
      data={stats.group('artists')}
      {label}
      on:click={x => handleInspect(x.detail.item)}
      overrideScales
    />
  </Panel>
{/if}