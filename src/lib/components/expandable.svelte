<script lang="ts">
  export let active = false;
</script>

<div>
  {#if active}
    <slot />
  {/if}
</div>