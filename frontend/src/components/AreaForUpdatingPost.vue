<template>
        <textarea v-model="text" name="newPostFromUser" rows="7" cols="50"></textarea><br>
    <div>
        <label for="imagePost">Changer l'image (.jpg ou .png)</label>
        <input @change="retrieveImage" type="file" id="fileName" name="fileName"><br>
        <InputSubmit v-on:click="updateOnePost()" content="Publier mon post modifié" /><br>
    </div>
        
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import axios from 'axios'

export default {
    name: "areaForUpdatingPost",
    components: {
    InputSubmit
    },
    data() {
        return {
            text: "",
            file: ""
        }
    },
    methods: {
        updateOnePost(postId) {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;
            const headersToPass = {'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data'};
            let formData = new FormData();
            formData.append("image", this.file);
            formData.append("text", this.text);

            axios({method:'put', url: urlDesti, data: formData, headers: headersToPass})
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