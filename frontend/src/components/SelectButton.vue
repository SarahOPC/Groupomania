<template>
<div>
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
                alert("Votre service vient d'être mis à jour");
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