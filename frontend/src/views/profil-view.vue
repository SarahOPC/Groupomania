<template>
    <div>
        <div>
            <Logo />
            <div>
                <h2>Bonjour</h2>
                <div class="name">
                    <TextInput />
                </div>
                <div class="service">
                    <SelectButton />
                </div>
                <div class="avatar">
                    <DefaultAvatar /><br>
                    <InputSubmit content="Changer ma photo de profil" />
                </div>
                <div class="changePassword">
                    <label for="newPassword">Nouveau mot de passe</label><br>
                    <input type="text" id="newPassword" name="newPassword" placeholder="Nouveau mot de passe"><br>
                    <label for="password">Confirmation du nouveau mot de passe</label><br>
                    <input type="password" v-model="password" id="password" name="password" placeholder="Nouveau mot de passe"><br>
                    <InputSubmit v-on:click="updatePassword()" content="Valider" />
                </div>
                <div class="changeview">
                <InputSubmit content="Supprimer mon compte" onclick="alert('Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est irréversible')" />
                <InputSubmit content="Retourner au fil d'actualité" />
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
            password: ''
        }
    },
    methods: {
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
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

</style>