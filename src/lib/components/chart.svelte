<script lang="ts" context="module">
	import { getColor } from '$lib/colors';
	import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables);
</script>

<script lang="ts">
  import type { ChartItem, ChartData, ChartType, ChartOptions, Plugin } from 'chart.js';
	import { onMount } from 'svelte';

  onMount(() => {
    Chart.defaults.color = getColor('text-B');
    Chart.defaults.font.size = 22;
  });

  export let type: ChartType;
  export let data: ChartData;
  export let options: ChartOptions | undefined = undefined;
  export let plugins: Plugin[] | undefined = undefined;

  let chart: Chart | undefined;

  function createChart(item: ChartItem) {
    chart = new Chart(item, { type, data, options, plugins });
    
    return {
      destroy() {
        chart?.destroy();
      }
    }
  }

  $: if (chart) {
    chart.config.data = data;
    chart.config.options = options;
    chart.update();
  }
</script>

{#key type}
  <canvas use:createChart></canvas>
{/key}