<template>
  <div class="switch">
    <Logo />
    <div>
      <font-awesome-icon data-bs-toggle="tooltip" title="Mode Mars"
        icon="fa-solid fa-user-astronaut" size="2x"
        :style="{ color: '#FFD7D7', 'margin-right': '0.5em', cursor: 'pointer' }" />
    </div>
    <div>
      <font-awesome-icon data-bs-toggle="tooltip" title="Mode Pommes"
        icon="fa-solid fa-apple-whole" size="2x"
        :style="{ color: '#FFD7D7', 'margin-right': '0.5em', cursor: 'pointer' }" />
    </div>
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
  --apple-background-image: url(../../../imagesBackground/darkApples.jpg);
}

#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;
  background-image: var(--mars-background-image, var(--apple-background-image));
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  height: 100vh;
}

html {
  background-image: var(--mars-background-image, var(--apple-background-image));
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

.switch {
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 2em;
}

</style>
