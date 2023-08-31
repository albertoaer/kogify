<script lang="ts">
	import { Card, ContentCard, Grid, Tags } from "$lib/components";
	import { isPolicyEnabled } from "$lib/policy";
	import type { ComponentType } from "svelte";

  export let data;
  
  const { cardData$ } = data;

  const cardPolicy = isPolicyEnabled('card-policy');
  const cardKind: ComponentType = cardPolicy ? ContentCard : Card;
  const cardProps = cardPolicy ? {} : { blur: true, hiddenContent: true };
</script>

<Grid>
  {#each $cardData$ as item}
    <svelte:component
      this={cardKind}
      src={item.images[0].url}
      name={item.name}
      href="/{item.type}/{item.id}"
      {...cardProps}
    >
      <div class="card-content">
        <h1>{item.name}</h1>
        {#if !cardPolicy}
          {#if item.type === 'artist'}
            <Tags tags={item.genres} background />
          {:else}
            <h2>{item.tracks.total} songs</h2>
            <h3>{item.description}</h3>
          {/if}
        {/if}
      </div>
    </svelte:component>
  {/each}
</Grid>

<style>
  .card-content {
    text-align: center;
    padding: 1em;
  }
</style>