<script lang="ts">
  export let src: string;
  export let name: string;
  export let href: string | undefined = undefined;
</script>

<a id="item" {href}>
  <img {src} alt={name}/>
  <slot />
</a>

<style>
  #item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-size: cover;
    background-position: center;
    position: relative;
    text-decoration: none;
    background-color: var(--color-strongest);
    color: var(--color-light-A);
    overflow: hidden;
    transition: 500ms all ease;
    width: 100%;
    height: 100%;
    padding: 1em 0em;
  }
  
  img {
    object-fit: cover;
    object-position: center;
    width: 20em;
    height: 20em;
    box-shadow: 0 10px 20px 0px var(--color-light-B);
    transition: 300ms all ease;
  }
  
  #item:hover {
    box-shadow: inset 0 -0.5em 0px 0px var(--color-light-A);
  }

  #item:hover img {
    box-shadow: 0 15px 20px 5px var(--color-strong-B);
    transition: 500ms all ease;
  }
</style>