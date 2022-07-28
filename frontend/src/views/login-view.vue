<template>
  <div>
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/LoginComponent.vue'

export default {
  name: 'login-view',
  components: {
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
</style>