<div id="margin">
  <slot />
</div>

<style>
  #margin {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 100%;
    max-height: 100%;
    margin: 2em 1em;
  }

  @media (max-width: 500px) {
    #margin {
      margin: 1em 0;
    }
  }
</style>