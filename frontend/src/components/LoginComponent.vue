<template>
  <div v-if="mode == 'login'">
    <h1>Se connecter</h1>
    <font-awesome-icon data-bs-toggle="tooltip" title="Se connecter" icon="fa-solid fa-arrow-right-to-bracket"
      size="lg" :style="{ color: '#FFD7D7' }" />
  </div>
  <div v-else>
    <h1>S'inscrire</h1>
    <font-awesome-icon data-bs-toggle="tooltip" title="S'inscrire" icon="fa-solid fa-door-open" size="lg"
      :style="{ color: '#FFD7D7' }" />
  </div>

  <div class="container">
    <label for="email">Email</label><br>
    <div>
      <font-awesome-icon data-bs-toggle="tooltip" title="Email" icon="fa-solid fa-at" size="lg"
        :style="{ color: '#FFD7D7', 'margin-right': '0.5em' }" />
      <input type="email" v-model="email" id="email" name="email" pattern="/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm" 
      required="required" placeholder="janedoe@groupomania.com">
    </div>

    <div>
      <label for="password">Mot de Passe</label><br>
      <font-awesome-icon data-bs-toggle="tooltip" title="Mot de passe" icon="fa-solid fa-key" size="lg"
        :style="{ color: '#FFD7D7', 'margin-right': '0.5em' }" />
      <input type="password" v-model="password" id="password" name="password" pattern="/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/" 
      required="required" placeholder="Mot de Passe">
    </div>

    <div v-if="mode !== 'login'">
      <font-awesome-icon data-bs-toggle="tooltip" title="Mot de passe" icon="fa-solid fa-key" size="lg"
        :style="{ color: '#FFD7D7', 'margin-right': '0.5em' }" />
      <input type="password" v-model="passwordVerification" id="passwordVerification" name="password" pattern="/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/" 
      required="required" placeholder="Vérification du mot de Passe">
    </div>

    <button type="button" class="btn" v-if="mode == 'login'" @click="switchToSignup()">Page d'inscription</button>
    <button type="button" class="btn" v-if="mode == 'login'" @click="findUser()">Connexion</button>

    <button type="button" class="btn" v-if="mode !== 'login'" @click="switchToLogin()">Page de connexion</button>
    <button type="button" class="btn" v-if="mode !== 'login'" @click="checkValidityOfEmail(); checkValidityOfPassword();">Créer un compte</button>
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
      passwordVerification: "",
      mode: 'login',
      regexEmail: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
      regexPassword: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/
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
        return true;
      } alert("La forme du mail rentré n'est pas correcte");
        return false;
    },
    checkValidityOfPassword() {
      console.log(this.password);
      console.log(this.passwordVerification);
      console.log(this.password === this.passwordVerification);

      if(this.password === this.passwordVerification) {
        let self = this;
        if(this.password.match(self.regexPassword) !== null) {
          return true;
        } alert("Le mot de passe ne correspond pas aux exigences minimales");
          return false;
      } else {
        alert("Les deux mots de passe ne correspondent pas");
      }
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
            sessionStorage.setItem('userRole', response.data.userRole);
            return self.$router.push({ path: '/news' })
          } else {
              alert(this.throwUnexpectedServerError(response.status, response.statusText));
          }
        })
        .catch(function (error) {
          alert(this.throwUnexpectedServerError(error.response.status, error.message));
        })
    },
    createUser() {
      let self = this;
      if(self.checkValidityOfEmail() !== true && self.checkValidityOfPassword !== true) {
        alert("Il y a des erreurs dans votre email et/ou votre mot de passe");
      } else {
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
                alert(this.throwUnexpectedServerError(response.status, response.statusText));
            }
          })
          .catch(function (error) {
            alert(this.throwUnexpectedServerError(error.response.status, error.message));
          })
      }
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
  margin: 0.5em;
}

.btn:hover {
  --bs-btn-hover-color: #4E5166;
  --bs-btn-hover-bg: #FFD7D7;
  --bs-btn-hover-border-color: #FD2D01;
}

h1 {
  color: #FFD7D7;
}

.helpPsw p {
  display: flex;
  flex-direction: column;
  margin: 0em;
}

input {
  border-radius: 0.5em;
  margin-bottom: 1.5em;
}

</style>