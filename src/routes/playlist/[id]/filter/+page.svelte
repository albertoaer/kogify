<script lang="ts">
	import { SongList, Panel } from "$lib/components";
	import type { Track } from "$lib/spotify";
  
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('artists')?.split(',');

  console.log(filter)
  
  export let data;

  const { tracks$ } = data;
  
  let tracks: Track[] = [];
  $: tracks = $tracks$;

  let filteredTracks: Track[] | undefined = undefined;
  $: if (filter) {
    filteredTracks = tracks.filter(x => x.artists.find(x => filter.includes(x.id)))
  }
</script>

<Panel>
  <SongList tracks={filteredTracks ?? tracks} />
</Panel>