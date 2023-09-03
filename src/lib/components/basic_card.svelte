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
    color: var(--color-text-A);
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
    box-shadow: 0 10px 20px 0px var(--color-text-B);
    transition: 300ms all ease;
  }

  #item:hover img {
    box-shadow: 0 15px 20px 5px var(--color-effect-A);
    transition: 500ms all ease;
  }
</style>