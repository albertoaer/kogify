<script lang="ts">
	import { Scaffold, DescriptionPanel } from '$lib/components';
	import type { Artist } from '$lib/spotify';

  export let data;

  const { artist$ } = data;

  let artist: Artist | undefined;
  $: artist = $artist$;
</script>

{#if artist}
  <Scaffold name={artist.name} image={artist.images[0].url}>
    <DescriptionPanel
      title={artist.name}
      tags={artist.genres}
      pageLink={artist.external_urls.spotify}
      appLink={artist.uri}
    />
  </Scaffold>
{/if}