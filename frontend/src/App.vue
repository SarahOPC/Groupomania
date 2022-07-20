<template>
<div class="bg-color">
  <Logo />
  <nav>| <router-link to="/">Se connecter</router-link> |</nav>
  <router-view></router-view>
</div>
</template>

<script>
import Logo from '@/components/logo-component.vue'

export default {
    components: {
    Logo
    }
}
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
  color: #FFD7D7;
}

nav a.router-link-exact-active {
  color: #FD2D01
;
}

.bg-color {
  background-image: linear-gradient(#4e4c4c, #4E5166);
  height: 100vh;
  color: #FFFFFF;
}
</style>
