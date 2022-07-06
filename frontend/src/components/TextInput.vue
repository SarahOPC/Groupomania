<template>
    <div class="nameForm">
        <label for="firstName">Prénom</label><br>
        <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="Prénom"><br>
        <InputSubmit v-on:click="updateFirstName()" content="Valider" /><br>
        <label for="lastName">Nom</label><br>
        <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Nom"><br>
        <InputSubmit v-on:click="updateLastName()" content="Valider" />
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
            lastName: ""
        }
    },
    components: {
        InputSubmit
    },
    methods: {
        updateFirstName() {
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
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
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
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
        }
    }
}
</script>

<style scoped>
</style>