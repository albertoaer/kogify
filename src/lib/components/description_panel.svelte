<script lang="ts">
	import { PageLinkLabel, AppLinkLabel } from "$lib/constants";
	import { Link, Panel, Row, BackButton } from ".";
	import Tags from "./tags.svelte";

  export let title: string;
  export let hideBackButton: boolean = false;
  export let tags: string[] | undefined = undefined;
  export let appLink: string | undefined = undefined;
  export let pageLink: string | undefined = undefined;
</script>

<Panel {title} centerTitle>
  <svelte:fragment slot='title-content'>
    {#if !hideBackButton}
      <Row justify="end" grow>
        <BackButton />
      </Row>
    {/if}
  </svelte:fragment>
  <div id="content">
    {#if tags}
      <Tags {tags} />
    {/if}
    <slot />
    {#if pageLink || appLink}
      <Row justify='space-around' margin fullWidth>
        {#if pageLink}
          <Link href={pageLink} blank alt>{PageLinkLabel}</Link>
        {/if}
        {#if appLink}
          <Link href={appLink}>{AppLinkLabel}</Link>
        {/if}
      </Row>
    {/if}
  </div>
</Panel>

<style>
  #content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
</style>