<script lang="ts">
  export let href: string | undefined;
  export let blank: boolean = false;
  export let noEnhancement: boolean = false;
</script>

<a {href} class:noEnhancement class:href target={blank ? "_blank" : undefined}><slot /></a>

<style>
  a {
    color: inherit;
    text-align: center;
    text-decoration: none;
  }
  
  a:not(.noEnhancement) {
    font-size: 1.2em;
  }

  a.href:hover {
    text-decoration: underline;
  }
</style>