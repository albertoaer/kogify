<script lang="ts">
	import { Scaffold, DescriptionPanel, Panel, SongList } from '$lib/components';
	import type { Artist, Track } from '$lib/spotify';

  export let data;

  const { artist$, topTracks$ } = data;

  let artist: Artist | undefined;
  $: artist = $artist$;

  let topTracks: Track[] | undefined;
  $: topTracks = $topTracks$;
</script>

{#if artist}
  <Scaffold name={artist.name} image={artist.images[0].url}>
    <DescriptionPanel
      title={artist.name}
      tags={artist.genres}
      pageLink={artist.external_urls.spotify}
      appLink={artist.uri}
    >
      <h2>Popularity: {artist.popularity}</h2>
    </DescriptionPanel>
    {#if topTracks}
      <Panel title="Top tracks">
        <SongList tracks={topTracks} />
      </Panel>
    {/if}
  </Scaffold>
{/if}