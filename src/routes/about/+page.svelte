<script lang="ts">
	import { Container } from "$lib/components";
  import { APP_TITLE } from "$lib/constants";
</script>

<Container>
  <h1 class="center">{APP_TITLE}</h1>
  <p>
    {APP_TITLE} is a web application intended to provide statictics based on Spotify user preferent music taste and playlists
  </p>
  <p>
    To do so, {APP_TITLE} is provided with the Spotify official api to retrieve the required information from users, playlists and artists
  </p>
</Container>

<style>
  .center {
    text-align: center;
  }
</style>