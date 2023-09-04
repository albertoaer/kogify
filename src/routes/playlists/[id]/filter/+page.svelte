<script lang="ts">
	import { getColor } from "$lib/colors.js";
	import { Chart, SongList } from "$lib/components";
	import { Panel, Picture } from "$lib/components/scaffold";
	import type { Track } from "$lib/spotify";
	import type { ChartData } from "chart.js";
  
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('artists')?.split(',');
  
  export let data;

  const { tracks$ } = data;

  let tracks: Track[] = [];
  $: tracks = $tracks$;

  let filteredTracks: Track[] | undefined = undefined;
  let dataSet: ChartData | undefined = undefined;
  let dataSetPercent = 0;

  $: if (filter) {
    filteredTracks = tracks.filter(x => x.artists.find(x => filter.includes(x.id)));
    const color = getColor('effect-A');
    const colorB = getColor('text-B');
    dataSet = {
      labels: [`${filteredTracks.length} Tracks`, 'Remainder'],
      datasets: [
        {
          label: 'Tracks',
          data: [filteredTracks.length, tracks.length - filteredTracks.length],
          backgroundColor: [color, colorB],
          borderColor: colorB,
          pointBackgroundColor: color,
          pointBorderColor: color,
          pointRadius: 8
        }
      ]
    };
    dataSetPercent = filteredTracks.length / tracks.length * 100;
  }
</script>

<Picture flex='0 1 auto' />
{#if dataSet}
  <Panel flex='0 1 15em' align='center' justify='center' rowGap='0em'>
    <Chart type='doughnut' options={{ events: [] }} data={dataSet} />
    <h3>{dataSetPercent.toFixed(4)}%</h3>
    {#if dataSetPercent < 1}
      <p>Not representative</p>
    {/if}
  </Panel>
{/if}
<Panel title='Showing {filteredTracks?.length || tracks.length} tracks' titleStart>
  <SongList tracks={filteredTracks ?? tracks} />
</Panel>