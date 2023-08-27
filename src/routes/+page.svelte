<script lang="ts">
	import { Card, Tags } from "$lib/components";
	import { SESSION_PROVIDER_KEY } from "$lib/constants";
	import { manageTopArtists } from "$lib/spotify";
	import { manageMyPlaylists } from "$lib/spotify/playlists";
	import type { SvelteSpotifySessionProvider } from "$lib/svelte_spotify_auth";
	import { combineLatest, map } from "rxjs";
  import { getContext } from "svelte";

  const provider: SvelteSpotifySessionProvider = getContext(SESSION_PROVIDER_KEY);
  const { topArtistData$ } = manageTopArtists(provider);
  const { myPlaylists$ } = manageMyPlaylists(provider);

  const cardData$ = combineLatest([myPlaylists$, topArtistData$]).pipe(map(([a, b]) => [...a, ...b]));
</script>

<div class="wrapper">
  {#each $cardData$ as item}
    <Card src={item.images[0].url} name={item.name} blur hiddenContent href="/{item.type}/{item.id}">
      <div class="card-content">
        <h1>{item.name}</h1>
        {#if item.type === 'artist'}
          <Tags tags={item.genres} />
        {:else}
          <h2>{item.tracks.total} songs</h2>
          <h3>{item.description}</h3>
        {/if}
      </div>
    </Card>
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-auto-rows: minmax(400px, auto);
    width: 100%;
  }

  @media (max-width: 500px) {
    .wrapper {
      grid-template-columns: 1fr;
    }
  }

  .card-content {
    text-align: center;
    padding: 1em;
  }
</style>