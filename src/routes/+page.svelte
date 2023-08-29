<script lang="ts">
	import { Card, ContentCard, Grid, Tags } from "$lib/components";
	import { SESSION_PROVIDER_KEY } from "$lib/constants";
	import { isPolicyEnabled } from "$lib/policy";
	import { getTopArtists } from "$lib/spotify";
	import { getMyPlaylists } from "$lib/spotify/playlists";
	import type { SvelteSpotifySessionProvider } from "$lib/svelte_spotify_auth";
	import { combineLatest, map } from "rxjs";
  import { getContext, type ComponentType } from "svelte";

  const provider: SvelteSpotifySessionProvider = getContext(SESSION_PROVIDER_KEY);
  const { topArtistData$ } = getTopArtists(provider);
  const { myPlaylists$ } = getMyPlaylists(provider);

  const cardData$ = combineLatest([myPlaylists$, topArtistData$]).pipe(map(([a, b]) => [...a, ...b]));

  const cardPolicy = isPolicyEnabled('card-policy');
  const cardKind: ComponentType = cardPolicy ? ContentCard : Card;
</script>

<Grid>
  {#each $cardData$ as item}
    <svelte:component this={cardKind} src={item.images[0].url} name={item.name} blur hiddenContent href="/{item.type}/{item.id}">
      <div class="card-content">
        <h1>{item.name}</h1>
        {#if !cardPolicy}
          {#if item.type === 'artist'}
            <Tags tags={item.genres} background />
          {:else}
            <h2>{item.tracks.total} songs</h2>
            <h3>{item.description}</h3>
          {/if}
        {/if}
      </div>
    </svelte:component>
  {/each}
</Grid>

<style>
  .card-content {
    text-align: center;
    padding: 1em;
  }
</style>