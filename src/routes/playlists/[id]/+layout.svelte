<script lang="ts">
  import { Scaffold } from '$lib/components/scaffold';
	import type { Playlist } from '$lib/spotify';

  export let data;

  const { playlist$, id } = data;

  let playlist: Playlist | undefined = undefined;
  $: playlist = $playlist$;
</script>

{#if playlist}
  <Scaffold image={playlist.images[0].url} title={playlist.name} href="/playlists/{id}" justify='center'>
    <slot />
  </Scaffold>
{/if}