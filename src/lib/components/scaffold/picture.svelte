<script lang="ts">
	import { getContext } from "svelte";
	import type { ScaffoldData } from "./model";
	import { Card } from "..";
	import { Panel } from ".";
	import type { Flex } from "../model";

  const { title, pictureSrc, href } = getContext<ScaffoldData>('scaffold');
	
	export let flex: Flex = '1 1 auto';
</script>

{#if pictureSrc}
	<Panel {flex} justify='center' align='center'>
		<Card src={pictureSrc} name={title} {href} rounded size="20em" shadow="0px 0px 25px 0px var(--color-effect-A)" />
		<slot />
	</Panel>
{/if}