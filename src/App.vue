<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './views/Home.vue'
import Hilo from "hilojs";

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
html {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff;
  font-family: Helvetica, arial, sans-serif;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
