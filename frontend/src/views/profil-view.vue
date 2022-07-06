<template>
    <div>
        <div>
            <Logo />
            <div>
                <h2 v-if="mode !== 'firstTime'">Bonjour {{ displayNames() }}</h2>
                <h2 v-else>Bonjour</h2>
                <h3 v-if="mode !== 'firstTime'">Du service {{ displayService() }}</h3>

                <div class="name">
                    <TextInput />
                </div>
                <div class="service">
                    <SelectButton />
                </div>
                <div class="avatar">
                    <h3 v-if="mode !== 'firstTime'">Ma photo de profil {{ displayAvatar() }}</h3>
                    <DefaultAvatar v-if="mode == 'firstTime'" /><br>
                    <InputSubmit v-on:click="changeAvatar()" content="Changer ma photo de profil" />
                </div>
                <div class="changePassword">
                    <label for="newPassword">Nouveau mot de passe</label><br>
                    <input type="text" id="newPassword" name="newPassword" placeholder="Nouveau mot de passe"><br>
                    <label for="password">Confirmation du nouveau mot de passe</label><br>
                    <input type="password" v-model="password" id="password" name="password" placeholder="Nouveau mot de passe"><br>
                    <InputSubmit v-on:click="updatePassword()" content="Valider" />
                </div>
                <div class="changeview">
                    <InputSubmit v-on:click="deleteProfil()" content="Supprimer mon compte" />
                    <p>Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est DEFINITIVE et IRREVERSIBLE</p>
                    <InputSubmit v-on:click="switchToNews()" content="Retourner au fil d'actualité" />
                </div>
            </div>
            <!--
                Bonjour + nom de la personne si déjà rempli
            -->
            <!--
                Button => delete user dans BDD + tous les posts et commentaires en BDD
            -->
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/logo-component.vue'
import InputSubmit from '@/components/InputSubmit.vue'
import TextInput from '@/components/TextInput.vue'
import SelectButton from '@/components/SelectButton.vue'
import DefaultAvatar from '@/components/DefaultAvatar.vue'
import axios from 'axios'

export default {
    name: 'profil-view',
    components: {
    Logo,
    InputSubmit,
    TextInput,
    SelectButton,
    DefaultAvatar
    },
    data() {
        return {
            password: '',
            mode: 'firstTime'
        }
    },
    methods: {
        displayNames() {
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";
            
            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                    let responseFirstName = response.data.firstName;
                    let responseLastName = response.data.lastName;
                    let names = responseFirstName + " " + responseLastName;
                    return names;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        displayService() {
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";
            
            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                    let responseService = response.data.service;
                    return responseService;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        displayAvatar() {
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";
            
            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                    let responseAvatar = response.data.avatar;
                    return responseAvatar;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        updatePassword() {
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/password";
            
            axios({method:'put', url: urlDesti, data: {
                    password: this.password
                }, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                alert("Votre mot de passe est maintenant modifié");
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        //changeAvatar() {
        //    let validToken = localStorage.getItem('userToken');
        //    let userValidToken = validToken.replace(/['"]+/g, '');
        //    let id = localStorage.getItem('userId');
        //    let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/avatar";
        //    let bodyFormData = new FormData();
        //    bodyFormData.append('image', imageFile);

        //    axios({method:'put', url: urlDesti, data: bodyFormData, headers:{'Authorization': 'Bearer ' + userValidToken},
        //    })
        //    .then(function(response) {
        //        alert("Votre avatar vient d'être mis à jour");
        //        console.log(response);
        //    })
        //    .catch(function(error) {
        //        console.log(error);
        //    })
        //},
        deleteProfil() {
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({method:'delete', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                alert("Votre compte vient d'être supprimer, à bientôt");
                console.log(response);
                localStorage.clear();
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

</style>