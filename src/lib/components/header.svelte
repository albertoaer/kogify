<script lang="ts">
	import { APP_TITLE } from "$lib/constants";
  import type { UserManager } from "$lib/spotify";

  export let user: UserManager;

  const { userData$ } = user;

  let y = 0;
</script>

<header class:background={y > 0}>
  <ul>
    <a href="/"><h1 class="breath">{APP_TITLE}</h1></a>
  </ul>
  <ul>
    <li class="mayHide"><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li>
      <a href="/profile">
        <img src="{$userData$?.images.at(-1)?.url || '/noImage.png'}" alt="User Profile">
      </a>
    </li>
  </ul>
</header>

<svelte:window bind:scrollY={y} />

<style>
  header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-A);
    margin: 0;
    font-size: 1.2em;
    height: 3em;
    position: sticky;
    top: 0;
    z-index: 10;
    transition: background 300ms ease-out;
    --color-hover: var(--color-background-A);
  }
  
  header.background {
    background: var(--color-background-A);
    background: linear-gradient(0deg, transparent 0%, var(--color-background-A) 15%); ;
    transition: background 200ms ease-out;
    --color-hover: var(--color-background-B);
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
    background-color: var(--color-hover);
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
    transition: 200ms all ease;
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