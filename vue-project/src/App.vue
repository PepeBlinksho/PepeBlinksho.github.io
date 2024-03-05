<script setup lang="ts">
console.log('Hello World')
const click = () => {
  console.log('Click!')
}
</script>

<template>
  <div class="btn-container">
    <img alt="Vue logo"
         src="@/assets/logo.svg"
         width="80"
         height="80"
         @click="click" />
  </div>
</template>

<style scoped>
.btn-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100000;
  cursor: pointer;
}
</style>
