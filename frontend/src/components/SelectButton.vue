<template>
    <div>
        <div v-if="mode == 'firstTime'">

            <select v-model="selectedService" name="service" id="service">
                <option value="Fruit">Fruit</option>
                <option value="Legume">Legume</option>
                <option value="Proteine">Proteine</option>
                <option value="Boisson">Boisson</option>
                <option value="Sucre">Sucre</option>
                <option value="Feculent">Feculent</option>
                <option value="Laitage">Laitage</option>
            </select><br>
            <InputSubmit @click="updateService(); displayService();" content="Valider" />
        </div>
        <h2 v-if="mode == 'notFirstTime'">{{ services }}</h2>
        <InputSubmit @click="changeMode()" content="Mettre à jour mon service" />

    </div>

</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import axios from 'axios'

export default {
    data() {
        return {
            selectedService: "",
            mode: 'notFirstTime',
            services: ''
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
        updateService() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/service";

            axios({
                method: 'put', url: urlDesti, data: {
                    service: this.selectedService
                }, headers: { 'Authorization': 'Bearer ' + userValidToken },
            })
                .then(function (response) {
                    if (response.status === 200) {
                    alert("Votre service vient d'être mis à jour");
                    console.log(response);
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        changeMode() {
            let self = this;
            return self.mode = 'firstTime';
        },
        displayService() {
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
                        return self.services = response.data.result[0].service;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        }
    }
}
</script>

<style scoped>
#service {
    border-radius: 0.5em;
}
</style>