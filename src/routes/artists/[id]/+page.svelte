<script lang="ts">
	import { Scaffold, Panel, SongList, Tags, Link, Row } from '$lib/components';
	import Separator from '$lib/components/separator.svelte';
	import { AppLinkLabel, PageLinkLabel } from '$lib/constants';
	import type { Artist, Track } from '$lib/spotify';

  export let data;

  const { artist$, topTracks$ } = data;

  let artist: Artist | undefined;
  $: artist = $artist$;

  let topTracks: Track[] | undefined;
  $: topTracks = $topTracks$;
</script>

{#if artist}
  <Scaffold title={artist.name} image={artist.images[0].url}>
    <Panel flex="0 0 40em">
      <h3>Genres</h3>
      <Tags tags={artist.genres} />
      <Separator />
      <h3 style="text-align: center;">Popularity: {artist.popularity}%</h3>
      <Row justify='space-between' wrap>
        <Link href={artist.external_urls.spotify} blank>{PageLinkLabel}</Link>
        <Link href={artist.uri}>{AppLinkLabel}</Link>
      </Row>
    </Panel>
    {#if topTracks}
      <Panel title="Top tracks" flex="1 0 100%">
        <SongList tracks={topTracks} />
      </Panel>
    {/if}
  </Scaffold>
{/if}