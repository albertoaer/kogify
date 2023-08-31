<script lang="ts">
	import { AudioPlayerButton, AuthoredItem } from "$lib/components";
	import type { Track } from "$lib/spotify";

  export let tracks: Track[];
</script>

<ul>
  {#each tracks as track, index}
    <AuthoredItem {index} title={track.name} authors={track.artists.map(x => [x.name, `/artist/${x.id}`])}>
      <p>{new Date(track.duration_ms).toISOString().slice(11, -1)}</p>
      {#if track.preview_url}
        <AudioPlayerButton src={track.preview_url} enabledText="playing" disabledText="preview" />
      {/if}
    </AuthoredItem>
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    margin: 0;
    columns: 20em auto;
  }
</style>