<template>
    <div>
        <div>
            <div v-if="mode == 'firstTime'">
                <label for="firstName">Prénom</label><br>
                <input type="text" v-model="firstName" id="firstName" name="firstName" placeholder="Prénom"><br>
                <label for="lastName">Nom</label><br>
                <input type="text" v-model="lastName" id="lastName" name="lastName" placeholder="Nom"><br>
                <InputSubmit @click="updateFirstName(); updateLastName(); displayNames();" content="Valider" />
            </div>
        </div>
        <h2 v-if="mode == 'notFirstTime'">{{ names }}</h2>
        <InputSubmit @click="changeMode()" content="Mettre à jour mes informations" />
    </div>

</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import axios from 'axios'

export default {
    name: 'textInput',
    data() {
        return {
            firstName: "",
            lastName: "",
            names: '',
            mode: 'notFirstTime'
        }
    },
    components: {
        InputSubmit
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
        changeMode() {
            let self = this;
            return self.mode = 'firstTime';
        },
        updateFirstName() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/firstName";

            axios({
                method: 'put', url: urlDesti, data: {
                    firstName: this.firstName
                }, headers: { 'Authorization': 'Bearer ' + userValidToken },
            })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
        },
        updateLastName() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/lastName";

            axios({
                method: 'put', url: urlDesti, data: {
                    lastName: this.lastName
                }, headers: { 'Authorization': 'Bearer ' + userValidToken },
            })
                .then(function (response) {
                    if (response.status === 200) {
                    console.log(response);
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
        },
        displayNames() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({
                method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken },
            })
                .then(function (response) {
                    if (response.status === 200) {
                        self.mode = 'notFirstTime';
                        return self.names = response.data.result[0].prenom + " " + response.data.result[0].nom;
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
</script>

<style scoped>
input {
    border-radius: 0.5em;
}
</style>