<script lang="ts">
  export let src: string;
  export let name: string;
  export let href: string | undefined = undefined;
  export let blur: boolean = false;
  export let hiddenContent: boolean = false;
  export let rounded: boolean = false;
  export let shadow: `${number}px ${number}px ${number}px ${number}px ${string}` | undefined = undefined;
  export let size: `${number}${'em' | 'px'}` | undefined = undefined;
</script>

<a class="item" {href} class:rounded class:size class:shadow style="--var-size: {size}; --var-shadow: {shadow}">
  <img {src} alt={name} class:blur/>
  <div class="content" class:hiddenContent>
    <slot />
  </div>
</a>

<style>
  .item {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    position: relative;
    background-color: var(--color-strongest);
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .item.size {
    width: var(--var-size);
    height: var(--var-size);
  }

  .item.shadow {
    box-shadow: var(--var-shadow);
  }
  
  .rounded {
    border-radius: 5px;
  }

  .item[href] {
    cursor: pointer;
  }

  .content {
    color: var(--color-light-A);
    text-shadow: 0px 0px 5px black;
    position: relative;
    overflow: hidden;
    user-select: none;
  }

  .content.hiddenContent {
    opacity: 0;
    transition: 1s all ease;
  }

  .item > img {
    object-fit: cover;
    object-position: center;
    position: absolute;
    height: auto;
    width: auto;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 1s all ease;
  }
  
  .item:hover > img.blur {
    filter: blur(5px) hue-rotate(20deg) contrast(120%);
    transition: 300ms all ease;
  }
  
  .item:hover > .content.hiddenContent {
    opacity: 1;
    transition: 1s all ease;
  }
</style>