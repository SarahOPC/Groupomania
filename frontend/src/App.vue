<template>
  <div>
    <Logo />
  </div>
  <router-view></router-view>
</template>

<script>
import Logo from '@/components/logo-component.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'

export default {
  mounted() {
     Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode))},
  components: {
    Logo
  }
}

</script>

<style>
:root {
  --mars-background-image: url(../../../imagesBackground/bgMars4k.jpg);
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;
  background-image: var(--mars-background-image);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100vh;
}

html {
  background-image: var(--mars-background-image);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100%;
}

nav a {
  font-weight: bold;
  color: #FFD7D7;
}

</style>
