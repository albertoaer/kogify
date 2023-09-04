<script lang="ts">
	import { BackButton, Row, Separator } from "$lib/components";
	import { Picture, Scaffold, Panel } from "$lib/components/scaffold";
  import Button from "$lib/components/button.svelte";
	import { getUser, type UserProfile } from "$lib/spotify";
	import { first } from "rxjs";

  export let data;

  const { provider } = data;

  function logOut() {
    provider.getSession().pipe(first()).subscribe(val => val.killSession());
  }

  const { userData$ } = getUser(provider);
  let userData: UserProfile | undefined = undefined;
  $: userData = $userData$;
</script>

{#if userData}
  <Scaffold title={userData.display_name ?? ''} image={userData.images.at(-1)?.url} align='center' justify='center'>
    <Picture flex='0 1 auto' />
    <Panel title="Profile" flex='0 1 30em'>
      <Row justify='space-between'>
        <p>Log out from the application</p>
        <Button on:click={logOut}>Log Out</Button>
      </Row>
      <Separator />
    </Panel>
  </Scaffold>
{/if}