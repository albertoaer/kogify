<script lang="ts">
	import { Container } from "$lib/components";
  import { APP_TITLE } from "$lib/constants";
</script>

<Container>
  <div id="main">
    <h1 class="center">{APP_TITLE}</h1>
    <p>
      {APP_TITLE} is a web application intended to provide statictics based on Spotify user preferent music taste and playlists
    </p>
    <p>
      To do so, {APP_TITLE} is provided with the Spotify official api to retrieve the required information from users, playlists and artists
    </p>
  </div>
</Container>

<style>
  .center {
    text-align: center;
  }

  #main {
    color: var(--color-light-A);
    background-color: var(--color-strongest);
    border-radius: 5px;
    padding: 1em 1.5em;
    border-top: 0.2em solid var(--color-strong-A);
  }
</style>