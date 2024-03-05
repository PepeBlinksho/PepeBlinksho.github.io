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
      <div class="flex flex-col gap-2 justify-end justify-items-end p-6 shadow-2xl rounded-lg">
        <div class="header">
          Docs AI Assistant
        </div>
        <div class="main-contents flex flex-col justify-between h-52">
          <div>
            <div>
              Welcome! I'm your Sendbird Docs Assistant. Ask me anything about our documentation
            </div>
          </div>
          <div>
            <input type="text" placeholder="入力してね">
          </div>
        </div>
      </div>
    {/if}
    <div class="flex justify-end" on:click={click}>
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
