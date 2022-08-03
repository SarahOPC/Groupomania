<template>
    <div>
        <nav>
            <router-link to="/news">
                <font-awesome-icon data-bs-toggle="tooltip" title="News" icon="fa-solid fa-message" size="lg"
                    :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" />
            </router-link>

                <font-awesome-icon @click="showModal = true" @close-modal="showModal = false" data-bs-toggle="tooltip" title="Rôle du modérateur" icon="fa-solid fa-user-secret"
                    size="lg" :style="{ color: '#FFD7D7', 'margin-right': '1.5em', cursor: 'pointer' }" />
                    <ModeratorModal v-show="showModal" @close-modal="showModal = false" />

            <router-link to="/logout">
                <font-awesome-icon data-bs-toggle="tooltip" title="Me déconnecter" icon="fa-solid fa-right-from-bracket"
                    size="lg" :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" />
            </router-link>
        </nav>
        <router-view></router-view>
        <div class="container">
            <h2>Bonjour {{ firstName }}</h2>
            <h2>Service {{ service }}</h2>
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
                    <div>
                        <label for="fileName">Choisir une nouvelle photo de profil</label><br>
                        <input @change="changeAvatarInDatabase" type="file" id="fileName" name="fileName">
                    </div>
                </div>
            </div>
            <div class="changePassword">
                <label for="password">Nouveau mot de passe</label><br>
                <input type="password" v-model="password" id="password" name="password"
                    placeholder="Nouveau mot de passe">
                <InputSubmit @click="updatePassword()" content="Valider" /><br>
                <InputSubmit @click="deleteProfil()" content="Supprimer mon compte" />
                <p>Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est <span>DEFINITIVE et
                        IRREVERSIBLE</span></p>
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
import ModeratorModal from '@/components/ModeratorModal.vue'

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
    ModeratorModal
},
    data() {
        return {
            password: '',
            mode: 'firstTime',
            responseAvatar: '',
            firstName: '',
            service: '',
            showModal: false
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
        getUserIdFromLocalStorage() {
            let id = sessionStorage.getItem('userId');
            return id;
        },
        getFirstName: function () {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        return self.firstName = response.data.result[0].prenom;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        getService() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        return self.service = response.data.result[0].service;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        updatePassword() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/password";

            axios({
                method: 'put', url: urlDesti, data: {
                    password: this.password
                }, headers: { 'Authorization': 'Bearer ' + userValidToken }
            })
                .then(function (response) {
                    if (response.status === 200) {
                        alert("Votre mot de passe est maintenant modifié");
                        console.log(response);
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        changeAvatarInDatabase(e) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/avatar";
            const headersToPass = { 'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data' };
            let file = e.target.files[0];
            let formData = new FormData();
            formData.append("image", file);

            axios({ method: 'put', url: urlDesti, data: formData, headers: headersToPass })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        self.displayAvatar();
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        displayAvatar() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
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
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        deleteProfil() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({
                method: 'delete', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken },
            })
                .then(function (response) {
                    if (response.status === 200) {
                        alert("Votre compte vient d'être supprimer");
                        console.log(response);
                        sessionStorage.clear();
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        switchToNews() {
            this.$router.push({ path: '/news' })
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: 3em;
}

h2 {
    font-weight: bold;
    color: #FFD7D7;
}

nav a {
    font-weight: bold;
    color: #FFD7D7;
}

nav a.router-link-exact-active {
    color: #FD2D01;
}

.info.col-5,
.avatar.col-5,
.changePassword,
.changeView {
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
</style>