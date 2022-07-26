<template>
  <Logo />
  <font-awesome-icon data-bs-toggle="tooltip" title="Passer au mode pomme" 
  v-on:click="switchToAppleMode()" icon="fa-solid fa-apple-whole" size="2x" 
  :style="{ color: '#FD2D01', margin: '0.5em' , cursor: 'pointer' }" />

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
  },
  methods: {
    switchToAppleMode() {
      let element = document.body;
      element.classList.toggle("appleMode");
    }
  }
}

</script>

<style>


.appleMode {
  background-image: url(../../../imagesBackground/darkApples.jpg);
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;
  background-image: url(../../../imagesBackground/bgMars4k.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100vh;
}

html {
  background-image: url(../../../imagesBackground/bgMars4k.jpg);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100%;
}

nav a {
  font-weight: bold;
  color: #FFD7D7;
}

nav a.router-link-exact-active {
  color: #FD2D01;
}

</style>
