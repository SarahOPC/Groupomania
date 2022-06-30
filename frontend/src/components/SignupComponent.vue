<template>
    <label for="email">Email</label><br>
    <input type="email" v-model="email" id="email" name="email" placeholder="janedoe@groupomania.com"><br>
    
    <label for="password" >Mot de Passe</label><br>
    <input type="password" v-model="password" id="password" name="password" placeholder="Mot de Passe">

    <button v-on:click="createUser">Valider</button>

    <ul>Mot de passe demandé :
        <li>Une MAJUSCULE - ABC</li>
        <li>Une minuscule - abc</li>
        <li>Un chiffre - 123</li>
        <li>Un caractère spécial hors &lt;, >, / ou $</li>
    </ul>
    
</template>

<script>
import axios from 'axios'

export default {
    data() {
      return {
        email:"",
        password:""
      }
    },
    methods: {
        createUser() {
          axios.post(process.env.VUE_APP_BACKEND_URL + "/signup",
          {
                email: this.email,
                password: this.password
          })
          .then(function(response) {alert(response);})
          .catch(function(error) {alert(error);})
        }
  }
}
</script>

<style scoped>
</style>