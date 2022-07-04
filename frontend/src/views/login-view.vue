<template>
  <div>
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
