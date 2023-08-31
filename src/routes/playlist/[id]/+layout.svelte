<script lang="ts">
  import { Scaffold } from '$lib/components';
	import type { Playlist } from '$lib/spotify';

  export let data;

  const { playlist$ } = data;

  let playlist: Playlist | undefined = undefined;
  $: playlist = $playlist$;
</script>

{#if playlist}
  <Scaffold image={playlist.images[0].url} name={playlist.name}>
    <slot />
  </Scaffold>
{/if}