<template>
  <div>
    <Logo />
    <div>
      <h2>Identifiez-vous</h2>

      <form>
        <EmailInput />
        <PasswordInput />
        <InputSubmit />
      </form>
      
      <p>Pas encore de compte, inscrivez-vous <a href="../views/signup-view.vue">ici</a></p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/logo-component.vue'
import InputSubmit from '@/components/InputSubmit.vue'
import EmailInput from '@/components/EmailInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'

export default {
  name: 'login-view',
  components: {
    Logo,
    InputSubmit,
    EmailInput,
    PasswordInput
  }
}

</script>
