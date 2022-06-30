<template>
  <div>
    <Logo />
    <div>
      <h2>Identifiez-vous</h2>

      <form>
        <Login />
      </form>
      
      <p>Pas encore de compte, inscrivez-vous <a href="../views/signup-view.vue">ici</a></p>
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
  }
}

</script>
