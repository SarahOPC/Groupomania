<template>
    <div>
        <textarea v-model="text" name="newPostFromUser" rows="7" cols="50" placeholder="Envie de partager quelque chose...?"></textarea><br>
        <label for="imagePost">Ajouter une image (.jpg ou .png)</label><br>
        <input @change="retrieveImage" type="file" id="fileName" name="fileName"><br>
        <InputSubmit v-on:click="createPosts()" content="Publier" /><br>
        <font-awesome-icon icon="fa-solid fa-paper-plane" />
    </div>
        
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
            text: "",
            file: ""
        }
    },
    methods: {
        retrieveImage(e) {
            return this.file = e.target.files[0];
        },
        createPosts() {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id;
            const headersToPass = {'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data'};
            let formData = new FormData();
            formData.append("image", this.file);
            formData.append("text", this.text);

            axios({method:'post', url: urlDesti, data: formData, headers: headersToPass})
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

textarea {
    border-radius: 0.5em;
    border-color: #FD2D01;
    border-style: dotted;
    margin-bottom: 1.5em;
    box-shadow: 0.4em 0.4em 0.4em #FD2D01;
}

#fileName, label {
    text-align-last: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    color: #FFD7D7;
    font-weight: bold;
}

</style>