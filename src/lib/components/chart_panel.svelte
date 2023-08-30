<script lang="ts" generics="T">
	import { Panel, Chart } from "$lib/components";
	import type { Stats1D } from "$lib/statistics";
	import type { ChartOptions } from "chart.js";
	import { type ComponentProps, createEventDispatcher } from "svelte";

  export let title: string;
  export let type: ComponentProps<Chart>['type'];
  export let data: Stats1D<T>;
  export let label: string;

  const dispatch = createEventDispatcher<{click: { item: T, title: string }}>();

  const maxLabelLength = 15;

  const options: ChartOptions = {
    indexAxis: 'y',
    responsive: true,
    aspectRatio: 1.3,
    animation: {
      duration: 500
    },
    scales: {
      y: {
        ticks: {
          callback: function(_value, index, _ticks) {
            const value = this.getLabelForValue(index);
            if (value.length > maxLabelLength) return value.slice(0, maxLabelLength) + '...';
            return value;
          }
        }
      },
      x: {
        type: 'logarithmic',
        ticks: {
          display: false
        },
      }
    },
    onHover: function(event, elements) {
      const style = (event.native?.target as HTMLElement | undefined)?.style;
      if (style) style.cursor = elements.length > 0 ? 'pointer' : 'default';
    },
    onClick: function(_event, elements) {
      const element = elements[0];
      if (element) {
        const item = data.at(element.index);
        if (item)
          dispatch('click', { item: item.ref, title: item.label });
      }
    }
  }
</script>

<Panel {title} base={45} bigPanel>
  <Chart {type} {options} data={data.getChartData(label)}>
  </Chart>
</Panel>