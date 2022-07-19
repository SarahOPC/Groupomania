<template>
  <div>
    <nav>
    <!--<router-link to="/logout">Se déconnecter</router-link>-->
  </nav>
  <router-view></router-view>
    <Logo />
    <div>
        <Login />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/logo-component.vue'
import Login from '@/components/LoginComponent.vue'

export default {
  name: 'login-view',
  components: {
    Logo,
    Login
  },
  methods: {
    redirect() {
      return this.$router.push('/signup')
    }
  }
}

</script>

<style scoped>

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>