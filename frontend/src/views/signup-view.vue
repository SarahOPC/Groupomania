<template>
  <div>
    <Logo />
    <div>
      <h2>Inscrivez-vous dès maintenant</h2>

      <form>
        <Signup />
      </form>
      
      <div @click="redirect">
        <p>Déjà inscrit, identifiez-vous ici</p>
      </div>
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
  },
  methods: {
    redirect() {
      return this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>