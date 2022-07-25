<template>
<div v-if="mode == 'login'">
  <h1>Se connecter</h1>
  <font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" title="Page de connexion" icon="fa-solid fa-arrow-right-to-bracket" size="lg" :style="{ color: '#FFD7D7' }"/>
</div>
<div v-else>
  <h1>S'inscrire</h1>
  <font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" title="Page d'inscription" icon="fa-solid fa-door-open" size="lg" :style="{ color: '#FFD7D7' }"/>
</div>

<div class="container">
    <label for="email">Email</label><br><font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" title="Email" icon="fa-solid fa-at" size="lg" :style="{ color: '#FFD7D7', 'margin-right': '0.5em' }" />
    <input type="email" v-model="email" id="email" name="email" placeholder="janedoe@groupomania.com"><br>
    
    <label for="password" >Mot de Passe</label><br><font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" title="Mot de passe" icon="fa-solid fa-key" size="lg" :style="{ color: '#FFD7D7', 'margin-right': '0.5em' }" />
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
  color: #FFD7D7;
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
  color: #FFD7D7;
}
.switch {
  margin-bottom: 1em;
}

.helpPsw p {
  display: flex;
  flex-direction: column;
  margin: 0em;
}

input {
    border-radius: 0.5em;
}

</style>