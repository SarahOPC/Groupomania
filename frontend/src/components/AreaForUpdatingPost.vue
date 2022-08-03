<template>
    <div>
        <textarea type="text" name="newPostFromUser" rows="7" cols="50" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"></textarea><br>
        <label for="imagePost">Changer l'image (.jpg ou .png)</label>
        <input @change="retrieveImage" type="file" id="fileName" name="fileName"><br>
        <InputSubmit @click="updateOnePost(postId)" content="Publier mon post modifié" /><br>
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
    props: {
        modelValue: String,
        postId: Number
    },
    emits: ['reloadPostsPage', 'update:modelValue'],
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
        getUserIdFromLocalStorage() {
            let id = sessionStorage.getItem('userId');
            return id;
        },
        retrieveImage(e) {
            return this.file = e.target.files[0];
        },
        updateOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;
            const headersToPass = { 'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data' };
            let formData = new FormData();
            formData.append("image", self.file);
            formData.append("text", self.modelValue);

            axios({ method: 'put', url: urlDesti, data: formData, headers: headersToPass })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.$emit('reloadPostsPage');
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        changeInputContent(content) {
            this.$emit('update:modelValue', content)
        }
    }
}
</script>

<style>
textarea {
    border-radius: 0.5em;
    border-color: #FD2D01;
    border-style: dotted;
    margin-bottom: 1.5em;
    margin-top: 1em;
    width: -webkit-fill-available;
}
</style>