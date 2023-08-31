<script lang="ts">
	import { Panel, Row, Scaffold } from "$lib/components";
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
  <Scaffold name={userData.display_name ?? ''} image={userData.images.at(-1)?.url}>
    <Panel title="Profile" base={50}>
      {#if userData.display_name}
        <Row justify='center'>
          <h2><u>{userData.display_name}</u></h2>
        </Row>
      {/if}
      <Row justify='space-between'>
        <p>Log out from the application</p>
        <Button on:click={logOut}>Log Out</Button>
      </Row>
      <hr style="color: var(--color-light-A)">
    </Panel>
  </Scaffold>
{/if}