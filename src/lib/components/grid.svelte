<script lang="ts">
  export let cellWidth: number = 400;
  export let cellHeight: number = 400;
</script>

<div style="--var-width: {cellWidth}px; --var-height: {cellHeight}px">
  <slot />
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--var-width), 1fr));
    grid-auto-rows: minmax(var(--var-height), auto);
    width: 100%;
  }

  @media (max-width: 500px) {
    div {
      grid-template-columns: 1fr;
    }
  }
</style>