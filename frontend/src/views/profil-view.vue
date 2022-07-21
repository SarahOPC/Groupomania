<template>
    <div>
        <nav>
            <router-link to="/news">Voir le fil d'actualité</router-link> | 
            <!--<router-link to="/logout">Se déconnecter</router-link>--> |
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
                        <h2>Service {{ service }}</h2>
                        <SelectButton />
                    </div>
                </div>
                <div class="avatar col-5">
                    <h3>Ma photo de profil </h3>
                    <img v-if="responseAvatar == null" src="../../images/AvatarParDefaut.jpg" alt="Avatar"><br>
                    <div v-if="responseAvatar !== null">
                        <img crossorigin="anonymous" v-if="responseAvatar !== ''" :src="responseAvatar" alt="Avatar">
                    <label for="fileName">Choisir une nouvelle photo de profil</label><br>
                    <input @change="changeAvatarInDatabase" type="file" id="fileName" name="fileName">
                    </div>
                </div>
            </div>
            <div class="changePassword">
                <label for="password">Nouveau mot de passe</label><br>
                <input type="password" v-model="password" id="password" name="password" placeholder="Nouveau mot de passe">
                <InputSubmit v-on:click="updatePassword()" content="Valider" /><br>
                <InputSubmit v-on:click="deleteProfil()" content="Supprimer mon compte" />
                <p>Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est <span>DEFINITIVE et IRREVERSIBLE</span></p>
            </div>
            <div class="changeView">
                <InputSubmit v-on:click="switchToNews()" content="Retourner au fil d'actualité" />
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
    },
    data() {
        return {
            password: '',
            mode: 'firstTime',
            responseAvatar: '',
            firstName: '',
            service: ''
        }
    },
    methods: {
        getFirstName: function() {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                return self.firstName = response.data.result[0].prenom;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        getService() {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                return self.service = response.data.result[0].service;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        updatePassword() {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/password";
            
            axios({method:'put', url: urlDesti, data: {
                    password: this.password
                }, headers:{'Authorization': 'Bearer ' + userValidToken}
            })
            .then(function(response) {
                if(response.status === 200) {
                alert("Votre mot de passe est maintenant modifié");
                console.log(response);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        changeAvatarInDatabase(e) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/avatar";
            const headersToPass = {'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data'};
            let file = e.target.files[0];
            let formData = new FormData();
            formData.append("image", file);

            axios({method:'put', url: urlDesti, data: formData, headers: headersToPass})
            .then(function(response) {
                if(response.status === 200) {
                alert("Votre avatar vient d'être mis à jour");
                console.log(response);
                self.displayAvatar();
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        displayAvatar() {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";
            
            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                    return self.responseAvatar = response.data.result[0].avatar;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        deleteProfil() {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({method:'delete', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                alert("Votre compte vient d'être supprimer, à bientôt");
                console.log(response);
                sessionStorage.clear();
                }
            })
            .catch(function(error) {
                console.log(error);
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

nav a {
    font-weight: bold;
    color: #4E5166;
}

nav a.router-link-exact-active {
    color: #FD2D01;
}

.info.col-5, .avatar.col-5, .changePassword, .changeView {
    margin: 1em;
    padding: 1em;
    background-color: #4E5166;
    color: #FFD7D7;
    border-radius: 1em;
}

.avatar img {
    width: 50%;
    height: 50%;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border-radius: 0.5em;
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