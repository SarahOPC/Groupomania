<template>
<div>
    <div>
        <div v-if="mode == 'firstTime'">
            <label for="firstName">Prénom</label><br>
            <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="Prénom"><br>
            <label for="lastName">Nom</label><br>
            <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Nom"><br>
            <InputSubmit v-on:click="updateFirstName(); updateLastName(); displayNames();" content="Valider" />
        </div>
    </div>
    <h2 v-if="mode == 'notFirstTime'">{{ names }}</h2>
    <InputSubmit v-on:click="changeMode()" content="Mettre à jour mes informations" />
</div>

</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import axios from 'axios'

export default {
    name: 'textInput',
    data() {
        return {
            firstName:"",
            lastName: "",
            names: '',
            mode: 'notFirstTime'
        }
    },
    components: {
        InputSubmit
    },
    methods: {
        getUserValidToken() {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            return userValidToken;
        },
        getUserIdFromLocalStorage() {
            let id = sessionStorage.getItem('userId');
            return id;
        },
        changeMode() {
            let self = this;
            return self.mode = 'firstTime';
        },
        updateFirstName() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/firstName";
            
            axios({method:'put', url: urlDesti, data: {
                    firstName: this.firstName
                }, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                alert("Votre prénom vient d'être mis à jour");
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        updateLastName() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/lastName";

            axios({method:'put', url: urlDesti, data: {
                    lastName: this.lastName
                }, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                alert("Votre nom vient d'être mis à jour");
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        displayNames() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";
            
            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                    self.mode = 'notFirstTime';
                    return self.names = response.data.result[0].prenom + " " + response.data.result[0].nom;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>

input {
    border-radius: 0.5em;
}

</style>