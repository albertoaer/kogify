<script lang="ts">
  import { Scaffold } from '$lib/components';
	import type { Playlist } from '$lib/spotify/playlists';
	import { createContext, currentContext } from './context';

  export let data;

  createContext(data.id);

  const { playlist$ } = currentContext();

  let playlist: Playlist | undefined = undefined;
  $: playlist = $playlist$;
</script>

{#if playlist}
  <Scaffold image={playlist.images[0].url} name={playlist.name}>
    <slot />
  </Scaffold>
{/if}