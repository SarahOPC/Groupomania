<template>
<h1 v-if="mode == 'login'">Se connecter</h1>
<h1 v-else>S'inscrire</h1>

<div class="container">
    <label for="email">Email</label><br>
    <input type="email" v-model="email" id="email" name="email" placeholder="janedoe@groupomania.com"><br>
    
    <label for="password" >Mot de Passe</label><br>
    <input type="password" v-model="password" id="password" name="password" placeholder="Mot de Passe">

    <div class="switch" v-if="mode == 'login'" @click="switchToSignup()">Vous n'êtes pas encore inscrit, cliquez ici</div>
    <div class="switch" v-else @click="switchToLogin()">Déjà inscrit, cliquez ici</div>

    <button type="button" class="btn" v-if="mode == 'login'" v-on:click="findUser()">Connexion</button>
    <button type="button" class="btn" v-else v-on:click="createUser()">Créer un compte</button>
</div>
<div class="helpPsw" v-if="mode !== 'login'">
  <p>Mot de passe demandé :</p>
  <p>Une MAJUSCULE - ABC</p>
  <p>Une minuscule - abc</p>
  <p>Un chiffre - 123</p>
  <p>Un caractère spécial hors &lt;, >, / ou $</p>
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

.container, .helpPsw {
  color: #4E5166;
  margin-top: 3em;
}
.btn {
  --bs-btn-bg: #4E5166;
  --bs-btn-border-radius: 0.5em;
  --bs-btn-color: #FFD7D7;
  --bs-btn-font-weight: bold;
}

.btn:hover {
  --bs-btn-hover-color: #4E5166;
  --bs-btn-hover-bg: #FFD7D7;
  --bs-btn-hover-border-color: #FD2D01;
}

h1 {
  color: #4E5166;
}
.switch {
  margin-bottom: 1em;
}

.helpPsw p{
  display: flex;
  flex-direction: column;
  margin: 0em;
}

</style>