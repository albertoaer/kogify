<script lang="ts">
	import { Scaffold, DescriptionPanel } from '$lib/components';
	import { SESSION_PROVIDER_KEY } from '$lib/constants';
	import { getTopArtists, type TopArtist } from '$lib/spotify';
	import { getArtist } from '$lib/spotify/artist.js';
	import type { SvelteSpotifySessionProvider } from '$lib/svelte_spotify_auth';
	import { map, of, switchMap } from 'rxjs';
	import { getContext } from 'svelte';

  export let data;
  
  const provider: SvelteSpotifySessionProvider = getContext(SESSION_PROVIDER_KEY);

  const data$ = getTopArtists(provider).topArtistData$.pipe(
    map((list: TopArtist[]) => list.find(x => x.id === data.id) as TopArtist),
    switchMap(artist => {
      if (artist) return of(artist);
      return getArtist(provider, data.id).artist$;
    })
  )
  let artist: TopArtist | undefined;
  $: artist = $data$;
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