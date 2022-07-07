<template>
<h1 v-if="mode == 'login'">Se connecter</h1>
<h1 v-else>S'inscrire</h1>

<div>
    <label for="email">Email</label><br>
    <input type="email" v-model="email" id="email" name="email" placeholder="janedoe@groupomania.com"><br>
    
    <label for="password" >Mot de Passe</label><br>
    <input type="password" v-model="password" id="password" name="password" placeholder="Mot de Passe">

    <div class="switch" v-if="mode == 'login'" @click="switchToSignup()">Vous n'êtes pas encore inscrit, cliquez ici</div>
    <div class="switch" v-else @click="switchToLogin()">Déjà inscrit, cliquez ici</div>

    <button v-if="mode == 'login'" v-on:click="findUser()">Connexion</button>
    <button v-else v-on:click="createUser()">Créer un compte</button>
</div>
    <div v-if="mode !== 'login'">
      <ul>Mot de passe demandé :
          <li>Une MAJUSCULE - ABC</li>
          <li>Une minuscule - abc</li>
          <li>Un chiffre - 123</li>
          <li>Un caractère spécial hors &lt;, >, / ou $</li>
      </ul>
    </div>
    
</template>


<script>
import axios from 'axios'

export default {
    data() {
      return {
        email:"",
        password:"",
        mode: 'login'
      }
    },
    methods: {
      switchToSignup() {
        this.mode = 'signup'
      },
      switchToLogin() {
        this.mode = 'login'
      },
      findUser() {
        let self = this;
        axios.post(process.env.VUE_APP_BACKEND_URL + "/login",
        {
              email: this.email,
              password: this.password
        })
        .then(function(response) {
          if (response.status === 200) {
            sessionStorage.setItem('userToken', JSON.stringify(response.data.access_token));
            sessionStorage.setItem('userId', JSON.stringify(response.data.userId));
            return self.$router.push({ path: '/news' })
          } else {
            alert("Ce n'est pas ce que nous attendions");
          }
        })
        .catch(function(error) {
          alert(error + "Une erreur s'est produite, vérifiez que vous êtes bien déjà inscrit ou que vous n'avez pas fait d'erreur");})
      },
      createUser() {
        let self = this;
        axios.post(process.env.VUE_APP_BACKEND_URL + "/signup",
        {
              email: this.email,
              password: this.password
        })
        .then(function(response) {
          if (response.status === 201) {
            return self.$router.go({ path: '/' })
          } else if(response.status === 401){
            alert("Vous êtes déjà inscrit")
            return self.$router.go({ path: '/' })
          } else {
            alert("Ce n'est pas ce que nous attendions")
          }
        })
        .catch(function(error) {
          alert(error + "Une erreur s'est produite, vérifiez que vous n'êtes pas déjà inscrit ou que vous n'avez pas fait d'erreur");})
      }
    }
}
</script>

<style scoped>
</style>