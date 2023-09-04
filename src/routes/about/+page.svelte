<script lang="ts">
	import { Scaffold, Panel } from "$lib/components/scaffold";
  import { APP_TITLE } from "$lib/constants";
</script>

<Scaffold title={APP_TITLE}>
  <Panel>
    <p>
      {APP_TITLE} is a web application intended to provide statictics based on Spotify user preferent music taste and playlists
    </p>
    <p>
      To do so, {APP_TITLE} is provided with the Spotify official api to retrieve the required information from users, playlists and artists
    </p>
  </Panel>
</Scaffold>