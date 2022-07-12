<template>
        <textarea v-model="text" name="newPostFromUser" rows="7" cols="50" placeholder="Envie de partager quelque chose...?"></textarea><br>
    <div>
        <label for="imagePost">Ajouter une image (.jpg ou .png)</label>
        <input @change="retrieveImage" type="file" id="fileName" name="fileName"><br>
        <InputSubmit v-on:click="createPosts()" content="Publier" /><br>
    </div>
        <InputSubmit content="Modifier" /><br>
        <InputSubmit content="Supprimer" /><br>
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import axios from 'axios'

export default {
    components: {
        InputSubmit
    },
    data() {
        return {
            text: ""
        }
    },
    methods: {
        retrieveImage(event) {
            let file = event.target.files[0];
            return file;
        },
        createPosts() {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id;
            this.retrieveImage();
            let formData = new FormData();
            formData.append("image", self.file);

            axios({method:'post', url: urlDesti, data: {
                    text: this.text,
                    formData : this.formData
                }, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
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