<template>
    <div>
        <nav>
            <router-link to="/news">
                <font-awesome-icon data-bs-toggle="tooltip" title="News" icon="fa-solid fa-message" size="lg"
                    :style="{ color: '#FFD7D7', 'margin': '1em' }" />
            </router-link>

                <font-awesome-icon @click="showModalModerator = true" data-bs-toggle="tooltip" title="Rôle du modérateur" icon="fa-solid fa-user-secret"
                    size="lg" :style="{ color: '#FFD7D7', 'margin': '1em', cursor: 'pointer' }" />
                    <MultipleModal v-if="showModalModerator" @close-modal-moderator="showModalModerator = false" isQuestion="false" content="Le rôle du modérateur sur ce site est de permettre et de faciliter les échanges courtois entre collègues.
                    Ce site a pour seul but de vous donner la possibilité de discuter de tout entre vous, que cela concerne le travail ou pas.
                    Le modérateur se réserve le droit de modifier ou supprimer selon son propre avis tout post ou commentaire considéré comme ne respectant pas l'esprit de notre entreprise
                    Merci de votre compréhension et de votre collaboration pour garder cet espace de détente sain et agréable" />

            <router-link to="/logout">
                <font-awesome-icon data-bs-toggle="tooltip" title="Me déconnecter" icon="fa-solid fa-right-from-bracket"
                    size="lg" :style="{ color: '#FFD7D7', 'margin': '1em' }" />
            </router-link>
            <h1>Profil</h1>
        </nav>
        <router-view></router-view>
        <div class="container">
            <h2>Bonjour {{ firstName }}</h2>
            <div class="profile d-flex align-items-center justify-content-center">
                <div class="info col-5">
                    <div>
                        <TextInput />
                    </div>
                    <div class="service">
                        <SelectButton />
                    </div>
                </div>
                <div class="avatar col-5">
                    <div>
                        <h3>Ma photo de profil </h3>
                    </div>
                    <div>
                        <img v-if="responseAvatar === ''" src="../../../backend/images/AvatarParDefaut.jpg" alt="Avatar"><br>
                        <div v-if="responseAvatar !== null">
                            <img crossorigin="anonymous" v-if="responseAvatar !== ''" :src="responseAvatar"
                                alt="Avatar">
                        </div>
                    </div>
                    <div class="avatarFile">
                        <label for="fileName">Choisir une nouvelle photo de profil</label><br>
                        <input @change="changeAvatarInDatabase" type="file" id="fileName" name="fileName">
                    </div>
                </div>
            </div>
            <div class="changePassword">
                <label for="password">Nouveau mot de passe</label><br>
                <input type="password" v-model="password" id="password" name="password" pattern="/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/" 
                    placeholder="Nouveau mot de passe">
                <input type="password" v-model="passwordVerification" id="passwordVerification" name="password" pattern="/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/" 
                    placeholder="Confirmation du nouveau mot de passe">
                <InputSubmit @click="updatePassword()" content="Valider" /><br>
            </div>
            <div class="deleteProfil">
                <InputSubmit @click="showModalDelete = true" content="Supprimer mon compte" />
                <p>Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est <span>DEFINITIVE et IRREVERSIBLE</span></p>
                <MultipleModal v-if="showModalDelete" @close-modal-delete="showModalDelete = false" @deleteProfil="deleteProfil(); showModalDelete = false" 
                isQuestion="true" content="Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est DEFINITIVE et IRREVERSIBLE" />
            </div>
            <div class="changeView">
                <InputSubmit @click="switchToNews()" content="Retourner au fil d'actualité" />
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import InputSubmit from '@/components/InputSubmit.vue'
import TextInput from '@/components/TextInput.vue'
import SelectButton from '@/components/SelectButton.vue'
import axios from 'axios'
import FormData from 'form-data'
import MultipleModal from '@/components/MultipleModal.vue'

export default {
    name: 'profil-view',
    beforeMount() {
        this.getFirstName();
        this.getService();
        this.displayAvatar();
    },
    components: {
    InputSubmit,
    TextInput,
    SelectButton,
    MultipleModal
},
    data() {
        return {
            password: '',
            passwordVerification: "",
            mode: 'firstTime',
            responseAvatar: '',
            firstName: '',
            service: '',
            showModalModerator: false,
            regexPassword: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
            showModalDelete: false
        }
    },
    methods: {
        throwUnexpectedServerError(status, message) {
            const error = new Error("Unexpected Server Response: " + status + " ! Message: " + message);
            error.code = 500;
            throw error;
        },
        getUserValidToken() {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            return userValidToken;
        },
        getUserIdFromSessionStorage() {
            let id = sessionStorage.getItem('userId');
            return id;
        },
        clearSessionStorage() {
            sessionStorage.clear();
            return this.$router.push("/");        
        },
        getFirstName() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        return self.firstName = response.data.result[0].prenom;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
        },
        getService() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        return self.service = response.data.result[0].service;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
        },
        checkValidityOfPassword() {
            if(this.password === this.passwordVerification) {
                if(this.password.match(this.regexPassword) !== null) {
                return true;
                } alert("Le mot de passe ne correspond pas aux exigences minimales");
                return false;
            } else {
                alert("Les deux mots de passe ne correspondent pas");
                return false;
            }
        },
        updatePassword() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/password";
            let self = this;
            if(this.checkValidityOfPassword() !== true) {
                alert("Il y a des erreurs dans votre mot de passe");
            } else {
            axios({
                method: 'put', url: urlDesti, data: {
                    password: self.password
                }, headers: { 'Authorization': 'Bearer ' + userValidToken }
            })
                .then(function (response) {
                    if (response.status === 200) {
                        alert("Votre mot de passe est maintenant modifié");
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
            }
        },
        changeAvatarInDatabase(e) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/avatar";
            const headersToPass = { 'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data' };
            let file = e.target.files[0];
            let formData = new FormData();
            formData.append("image", file);

            axios({ method: 'put', url: urlDesti, data: formData, headers: headersToPass })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayAvatar();
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
        },
        displayAvatar() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({
                method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken },
            })
                .then(function (response) {
                    if (response.status === 200) {
                        sessionStorage.setItem('avatar', response.data.result[0].avatar);
                        return self.responseAvatar = response.data.result[0].avatar;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
        },
        deleteProfil() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({
                method: 'delete', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken },
            })
                .then(function (response) {
                    if (response.status === 200) {
                        alert("Votre compte vient d'être supprimer");
                        this.clearSessionStorage();
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
        },
        switchToNews() {
            this.$router.push({ path: '/news' })
        }
    }
}
</script>

<style scoped>

fa-message-hover {
    color: #FD2D01;
}

h1 {
  color:#FFD7D7;
  margin-top: 1em;
  font-weight: bold;
}

.container {
    margin-top: 3em;
}

h2 {
    font-weight: bold;
    color: #FFD7D7;
    margin-bottom: 2em;
}

.info.col-5,
.avatar.col-5,
.changePassword,
.changeView,
.deleteProfil {
    margin: 1em;
    padding: 1em;
    background-color: #FFFFFF;
    color: #4E5166;
    border-radius: 1em;
    box-shadow: 0.4em 0.4em 0.4em #FD2D01;
}

.avatar img {
    width: 50%;
    height: 50%;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 0.5em;
    box-shadow: 0.4em 0.4em 0.4em #FD2D01;
}

#password {
    border-radius: 0.5em;
    margin: 0.5em;
}

span {
    color: #FD2D01;
    font-weight: bold;
    text-decoration: underline;
}

input {
  border-radius: 0.5em;
  margin: 0.5em;
}

@media (max-width: 600px) {
    .avatarFile input {
        font-size: xx-small;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1150px) and (orientation: landscape) {
    nav {
      font-size: x-large;
    }
}

</style>