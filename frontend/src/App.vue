<template>
  <Logo />
  <router-view></router-view>
</template>

<script>
import Logo from '@/components/logo-component.vue'

export default {
    components: {
    Logo
    }
}

</script>

<style>
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
