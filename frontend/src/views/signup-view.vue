<template>
  <div>
    <Logo />
    <div>
      <h2>Inscrivez-vous dès maintenant</h2>

      <form>
        <EmailInput />
        <PasswordInput content="Mot de passe" />
        <InputSubmit content="Valider" />
      </form>
      
      <FalseRegex />
      
      <p>Déjà inscrit, identifiez-vous <a href="../views/login-view.vue">ici</a></p>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/logo-component.vue'
import InputSubmit from '@/components/InputSubmit.vue'
import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import FalseRegex from'@/components/FalseRegex.vue'

export default {
  name: 'signup-view',
  components: {
    Logo,
    InputSubmit,
    EmailInput,
    PasswordInput,
    FalseRegex
  }
}
</script>

<style scoped>
</style>