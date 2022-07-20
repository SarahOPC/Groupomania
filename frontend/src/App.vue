<template>
<div class="bg-color">
  <h1>Miamomania</h1>
  <h2>LE réseau social de Groupomania</h2>
  <nav>| <router-link to="/">Se connecter</router-link> |</nav>
  <router-view></router-view>
</div>
</template>

<script>
/* import mixins from '@/mixins/mixinsTokenAndId'

export default {
    mixins: [mixins]
} */
</script>

<style>
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #FFD7D7;
}

.bg-color {
  background-image: linear-gradient(#4E5166, #727272, #4E5166);
  height: 100vh;
  color: #FFFFFF;
}
</style>
