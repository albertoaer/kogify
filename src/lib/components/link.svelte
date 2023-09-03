<script lang="ts">
  export let href: string | undefined;
  export let blank: boolean = false;
</script>

<a {href} class:href target={blank ? "_blank" : undefined}><slot /></a>

<style>
  a {
    color: var(--color-text-A);
    font-size: 1.2em;
    text-align: center;
    text-decoration: none;
  }

  a.href:hover {
    text-decoration: underline;
  }
</style>