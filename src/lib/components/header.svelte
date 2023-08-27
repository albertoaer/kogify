<script lang="ts">
  import type { UserManager } from "$lib/spotify";

  export let manager: UserManager;

  export let title: string;

  const { profilePicture$ } = manager;
</script>

<header>
  <ul>
    <a href="/"><h1 class="breath">{title}</h1></a>
  </ul>
  <ul>
    <li class="mayHide"><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li>
      <a href="/profile">
        <img src="{$profilePicture$ || '/noImage.png'}" alt="User Profile">
      </a>
    </li>
  </ul>
</header>

<style>
  header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-strongest);
    color: var(--color-light-A);
    margin: 0;
    font-size: 1.2em;
    height: 3em;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  h1, ul {
    margin: 0;
    padding: 0;
  }
  
  ul {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
  }
  
  li {
    display: flex;
    align-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    height: 100%;
    position: relative;
  }

  li:hover a {
    background-color: var(--color-strong-B);
    transform: translateY(10px);
    transition: 300ms all ease;
  }
  
  a {
    display: flex;
    align-content: center;
    align-items: center;
    color: inherit;
    text-decoration: none;
    height: 100%;
    padding: 0 1em;
    transition: 500ms all ease;
  }

  img {
    height: 70%;
    width: auto;
    border-radius: 20%;
  }

  .breath {
    padding: 0 0.7em;
  }

  @media (max-width: 600px) {
    .breath {
      padding: 0 0.3em;
    }

    a {
      padding: 0 0.5em;
    }
  }

  @media (max-width: 350px) {
    .mayHide {
      display: none;
    }
  }
</style>