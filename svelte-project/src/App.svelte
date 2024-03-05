<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  // import Counter from './lib/Counter.svelte'
  let isShow = false
  const click = () => {
    isShow = !isShow
  }
</script>

<main>
  <div class="img-wrapper">
    {#if isShow}
      <div>
        表示されるか
      </div>
    {/if}
    <div on:click={click}>
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </div>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  .img-wrapper {
    position: fixed;
    bottom: 36px;
    right: 36px;
  }
</style>
