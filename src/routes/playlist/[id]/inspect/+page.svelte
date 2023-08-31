<script lang="ts">
	import { Row, SongList, BackButton, Panel } from "$lib/components";
	import type { Track } from "$lib/spotify";
	import type { InspectData } from "../+layout";
  
  export let data;

  const { tracks$, inspectData$ } = data;
  
  let tracks: Track[] = [];
  $: tracks = $tracks$;

  let inspectData: InspectData | undefined;
  $: inspectData = $inspectData$;

  let filteredTracks: Track[] | undefined = undefined;
  $: if (inspectData) {
    filteredTracks = tracks.filter(x => x.artists.find(x => (inspectData as InspectData).ids.includes(x.id)));
  }
</script>

<Panel title="Songs: {inspectData?.title ?? 'all'}" base={45} bigPanel>
  <Row slot='title-content' justify='end' grow>
    <BackButton />
  </Row>
  <SongList tracks={filteredTracks ?? tracks} />
</Panel>