<script lang="ts">
  export let href: string;
  export let blank: boolean = false;
  export let alt: boolean = false;
</script>

<a {href} target={blank ? "_blank" : "_self"} class:alt><slot /></a>

<style>
  a {
    color: var(--color-light-A);
    text-decoration: underline;
    --color-underline: var(--color-strong-B);
    font-size: 1.2em;
  }
  
  a.alt {
    --color-underline: var(--color-strong-A);
  }
  
  a:hover {
    text-decoration-color: var(--color-underline);
  }
</style>