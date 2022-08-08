<template>
  <div v-if="mode == 'login'">
    <h1>Se connecter</h1>
    <font-awesome-icon data-bs-toggle="tooltip" title="Page de connexion" icon="fa-solid fa-arrow-right-to-bracket"
      size="lg" :style="{ color: '#FFD7D7' }" />
  </div>
  <div v-else>
    <h1>S'inscrire</h1>
    <font-awesome-icon data-bs-toggle="tooltip" title="Page d'inscription" icon="fa-solid fa-door-open" size="lg"
      :style="{ color: '#FFD7D7' }" />
  </div>

  <div class="container">
    <label for="email">Email</label><br>
    <div>
      <font-awesome-icon data-bs-toggle="tooltip" title="Email" icon="fa-solid fa-at" size="lg"
        :style="{ color: '#FFD7D7', 'margin-right': '0.5em' }" />
      <input type="email" v-model="email" id="email" name="email" pattern="/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm" 
      required="required" placeholder="janedoe@groupomania.com">
      <button type="button" class="btn-ok" @click="checkValidityOfEmail()">OK</button><br>
      
    </div>

    <div>
      <label for="password">Mot de Passe</label><br>
      <font-awesome-icon data-bs-toggle="tooltip" title="Mot de passe" icon="fa-solid fa-key" size="lg"
        :style="{ color: '#FFD7D7', 'margin-right': '0.5em' }" />
      <input type="password" v-model="password" id="password" name="password" pattern="/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/" 
      required="required" placeholder="Mot de Passe">
      <button type="button" class="btn-ok" @click="checkValidityOfPassword()">OK</button><br>
    </div>

    <div class="switch" v-if="mode == 'login'" @click="switchToSignup()">Vous n'êtes pas encore inscrit, cliquez ici
    </div>
    <div class="switch" v-else @click="switchToLogin()">Déjà inscrit, cliquez ici</div>

    <div v-if="this.regexMailValidated === 1 && this.regexPasswordValidated === 1">
      <button type="button" class="btn" v-if="mode == 'login'" @click="findUser()">Connexion</button>
      <button type="button" class="btn" v-else @click="createUser()">Créer un compte</button>
    </div>
  </div>
  <div class="helpPsw" v-if="mode !== 'login'">
    <p>Mot de passe demandé :</p>
    <p>Minimum de 6 caractères</p>
    <p>Une MAJUSCULE - ABC</p>
    <p>Une minuscule - abc</p>
    <p>Un chiffre - 123</p>
    <p>Pas d'espace</p>
  </div>

</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: "",
      password: "",
      mode: 'login',
      regexEmail: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
      regexPassword: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
      regexMailValidated: 0,
      regexPasswordValidated: 0
    }
  },
  methods: {
    throwUnexpectedServerError(status, message) {
      const error = new Error("Unexpected Server Response: " + status + " ! Message: " + message);
      error.code = 500;
      throw error;
    },
    switchToSignup() {
      this.mode = 'signup'
    },
    switchToLogin() {
      this.mode = 'login'
    },
    checkValidityOfEmail() {
      let self = this;
      if(this.email.match(self.regexEmail) !== null) {
        this.regexMailValidated = 1;
        console.log("mail" + this.regexMailValidated);
        return true;
      } this.regexMailValidated = 0;
        console.log("mail" + this.regexMailValidated);
        alert("La forme du mail rentré n'est pas correcte");
        return false;
    },
    checkValidityOfPassword() {
      let self = this;
      if(this.password.match(self.regexPassword) !== null) {
        this.regexPasswordValidated = 1;
        console.log("pswd" + this.regexPasswordValidated);
        return true;
      } this.regexPasswordValidated = 1;
      console.log("pswd" + this.regexPasswordValidated);
        alert("Le mot de passe ne correspond pas aux exigences minimales");
        return false;
    },
    findUser() {
      let self = this;
      axios.post(process.env.VUE_APP_BACKEND_URL + "/login",
        {
          email: this.email,
          password: this.password
        })
        .then(function (response) {
          if (response.status === 200) {
            sessionStorage.setItem('userToken', JSON.stringify(response.data.access_token));
            sessionStorage.setItem('userId', JSON.stringify(response.data.userId));
            return self.$router.push({ path: '/news' })
          } else {
              this.throwUnexpectedServerError(response.status, response.statusText);
          }
        })
        .catch(function (error) {
          this.throwUnexpectedServerError(error.response.status, error.message);
        })
    },
    createUser() {
      let self = this;
      axios.post(process.env.VUE_APP_BACKEND_URL + "/signup",
        {
          email: this.email,
          password: this.password
        })
        .then(function (response) {
          if (response.status === 201) {
            return self.$router.go({ path: '/' })
          } else if (response.status === 401) {
            alert("Vous êtes déjà inscrit")
            return self.$router.go({ path: '/' })
          } else {
              this.throwUnexpectedServerError(response.status, response.statusText);
          }
        })
        .catch(function (error) {
          this.throwUnexpectedServerError(error.response.status, error.message);
        })
    }
  }
}
</script>

<style scoped>
.container,
.helpPsw {
  color: #FFD7D7;
  margin-top: 3em;
}

.btn {
  --bs-btn-bg: #4E5166;
  --bs-btn-border-radius: 0.5em;
  --bs-btn-color: #FFD7D7;
}

.btn:hover {
  --bs-btn-hover-color: #4E5166;
  --bs-btn-hover-bg: #FFD7D7;
  --bs-btn-hover-border-color: #FD2D01;
}

.btn-ok {
  background-color: #4E5166;
  border-radius: 0.5em;
  color: #FFD7D7;
  font-size: 0.9em;
  margin-left: 0.7em;
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