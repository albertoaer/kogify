<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button, PreparedChart, Separator, Tags } from "$lib/components";
	import type { Flex } from "$lib/components/model.js";
	import Row from "$lib/components/row.svelte";
  import { Panel, Picture } from '$lib/components/scaffold';
	import type { Track, TrackArtist } from "$lib/spotify";
	import type { Stats1D } from "$lib/statistics";

  export let data;

  const { id, stats$, tracks$, trackStats$ } = data;

  let stats: Stats1D<TrackArtist> | undefined;
  let avgSongs: number = 0;
  let underAvgList: TrackArtist[] | undefined;
  $: {
    stats = $stats$;
    avgSongs = stats.avg();
    underAvgList = stats.filter(({ value }) => value < avgSongs).collect();
  }
  
  let popularSongsOwners: [string, string][] = [];
  $: {
    function calculateSongsOwners(stats: Stats1D<Track>): [string, string][] {
      const filterArr = new Set<string>();
      return stats.collect().map(x => x.artists[0]).filter(x => {
        let contained = filterArr.has(x.id);
        filterArr.add(x.id);
        return !contained;
      }).map(x => [x.name, `/playlists/${id}/filter?artists=${x.id}`]);
    }
    const trackStats = $trackStats$;
    popularSongsOwners = calculateSongsOwners(trackStats.top(15));
  }

  const label = 'Artists appearance';

  function handleInspect(items?: TrackArtist[]) {
    const params = items ? `?artists=${items.map(x => x.id).join(',')}` : '';
    goto(`/playlists/${id}/filter${params}`);
  }

  let chartPanelFlex: Flex = '1 0 35em';
  function adjustMaxChartPanel(media: MediaQueryList | MediaQueryListEvent) {
    chartPanelFlex = media.matches ? '1 1 auto' : '1 0 35em';
  }

  let mediaQuery = window.matchMedia('(max-width: 600px)');
  adjustMaxChartPanel(mediaQuery);
  mediaQuery.addEventListener('change', adjustMaxChartPanel);
</script>

{#if stats}
  <Picture flex='0 1 auto'>
    <Row justify='center' wrap gap='1em'><Button>Genres</Button><Button>Popularity</Button></Row>
  </Picture>
  <Panel title='Facts' justify='start' align='stretch' flex='0 0 25em'>
    <div>
        {#if stats.count === 1}
        <p>This playlist contains songs by only <b>1</b> artist</p>
      {:else}
        <p>This playlist contains songs by <b>{stats.count}</b> different artists</p>
        <p>
          The one with most songs is <b>{stats.at(0)?.label}</b> with <b>{stats.at(0)?.value}</b> songs:
        </p>
        <ul>
          <li>{((stats.at(0)?.value || 0) / $tracks$.length * 100).toFixed(2)}% of the songs</li>
          <li>{((stats.at(0)?.value || 0) / avgSongs).toFixed(2)}% over the average</li>
        </ul>
      {/if}
    </div>
    <div>
      <p>The average number of songs per artist is <b>{avgSongs}</b></p>
      {#if underAvgList}
        <Row justify='start' gap='0.4em'>
          <p><b>{underAvgList.length} artist{underAvgList.length > 1 ? 's' : ''}</b> under the average</p>
          <Button on:click={_ => handleInspect(underAvgList)}>Explore their songs</Button>
        </Row>
      {/if}
    </div>
    <Separator />
    <div>
      <h3>Mentions</h3>
      {#if popularSongsOwners}
      <p>These are the artists with the most popular songs:</p>
      <Tags tags={popularSongsOwners} />
      {/if}
    </div>
  </Panel>
  <Panel title='Top {stats.count < 15 ? stats.count : 15}' flex={chartPanelFlex}>
    <PreparedChart
      type='bar'
      data={stats.top(15)}
      {label}
      overrideScales
      on:click={x => handleInspect([x.detail.item])}
    />
  </Panel>
{/if}