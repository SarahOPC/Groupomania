<template>
  <div>
    <Logo />
    <div>
      <h2>Inscrivez-vous dès maintenant</h2>

      <form>
        <Signup />
      </form>
      
      <p>Déjà inscrit, identifiez-vous <a href="../views/login-view.vue">ici</a></p>

    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import Logo from '@/components/logo-component.vue'
import Signup from '@/components/SignupComponent.vue'

export default {
  name: 'signup-view',
  components: {
    Logo,
    Signup,
  }
}
</script>

<style scoped>
</style>