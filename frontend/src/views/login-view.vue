<template>
  <div>
    <Logo />
    <div>
      <h2>Identifiez-vous</h2>

      <form>
        <Login />
      </form>

      <div @click="redirect">
        <p>Pas encore de compte, inscrivez-vous ici</p>
      </div>
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
