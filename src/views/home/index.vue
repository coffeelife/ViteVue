<template>
  <div class="container">
    <div class="home">home</div>
    <h2>{{ msg }}</h2>
    <h2>{{ count }}</h2>
    <div class="box"></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const msg = ref("Hello World");
const count = ref(1);
</script>

<style scoped lang="scss">
.container {
  .box {
    width: 50px;
    height: 50px;
    background-color: aquamarine;
  }
}
.home {
  display: block;
  width: 200px;
  height: 100px;
  background-color: aqua;
  margin: 0px auto;
}
</style>