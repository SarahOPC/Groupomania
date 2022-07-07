<template>
<div>
    <div v-if="mode == 'firstTime'">
        <label for="service">Service</label><br>
        
        <select v-model="selectedService" name="service" id="service">
        <option value="Fruit">Fruit</option>
        <option value="Legume">Legume</option>
        <option value="Proteine">Proteine</option>
        <option value="Boisson">Boisson</option>
        <option value="Sucre">Sucre</option>
        <option value="Feculent">Feculent</option>
        <option value="Laitage">Laitage</option>
        </select><br>
        <InputSubmit v-on:click="updateService(); displayService();" content="Valider" />
    </div>
    <h2 v-if="mode == 'notFirstTime'">Service {{ services }}</h2>
    <InputSubmit v-on:click="changeMode()" content="Mettre à jour mon service" />

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
        updateService() {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/service";
            
            axios({method:'put', url: urlDesti, data: {
                    service: this.selectedService
                }, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                alert("Votre service vient d'être mis à jour");
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        changeMode() {
            let self = this;
            return self.mode = 'firstTime';
        },
        displayService() {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";
            
            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken},
            })
            .then(function(response) {
                if(response.status === 200) {
                    self.mode = 'notFirstTime';
                    return self.services = response.data.result[0].service;
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
</style>