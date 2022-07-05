<template>
<div>
    <label for="service">Service</label><br>
    
    <select v-model="selectedService" name="service" id="service">
      <option value="fruit">Fruit</option>
      <option value="legume">Legume</option>
      <option value="proteine">Proteine</option>
      <option value="boisson">Boisson</option>
      <option value="sucre">Sucre</option>
      <option value="feculent">Feculent</option>
      <option value="laitage">Laitage</option>
    </select><br>
    <InputSubmit v-on:click="updateService()" content="Valider" />

</div>

</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import axios from 'axios'

export default {
    data() {
        return {
            selectedService: ""
        }
    },
    components: {
        InputSubmit
    },
    methods: {
        updateService() {
            let validToken = localStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = localStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil/service";
            
            axios({method:'put', url: urlDesti, data: {
                    service: this.selectedService
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