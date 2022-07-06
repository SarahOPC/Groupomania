<template>
    <div>
        <div>
            <Logo />
            <div>
                <h2>Bonjour</h2>
                <div class>
                    <TextInput />
                </div>
                <div class="service">
                    <SelectButton />
                </div>
                <div class="avatar">
                    <h3>Ma photo de profil {{ responseAvatar }}</h3>
                    <InputSubmit v-on:click="changeAvatar(); displayAvatar();" content="Changer ma photo de profil" />
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
import axios from 'axios'

export default {
    name: 'profil-view',
    components: {
    Logo,
    InputSubmit,
    TextInput,
    SelectButton,
    },
    data() {
        return {
            password: '',
            mode: 'firstTime',
            responseAvatar: ''
        }
    },
    methods: {
        displayAvatar() {
            alert("I'm here")
            let self = this;
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";
            
            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                    alert(response.data.result[0].avatar)
                    return self.responseAvatar = response.data.result[0].avatar;
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