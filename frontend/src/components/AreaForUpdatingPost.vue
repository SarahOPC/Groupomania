<template>
        <textarea name="newPostFromUser" rows="7" cols="50" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"></textarea><br>
    <div>
        <label for="imagePost">Changer l'image (.jpg ou .png)</label>
        <input @change="retrieveImage" type="file" id="fileName" name="fileName"><br>
        <InputSubmit v-on:click="updateOnePost(postId), reloadPageAfterChange()" content="Publier mon post modifié" /><br>
    </div>
        
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
//import PostComponent from '@/components/PostComponent.vue'
import axios from 'axios'

export default {
    name: "areaForUpdatingPost",
    components: {
    InputSubmit,
    //PostComponent
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
    emits: ['update:modelValue'],
    methods: {
        retrieveImage(e) {
            return this.file = e.target.files[0];
        },
        updateOnePost(postId) {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;
            const headersToPass = {'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data'};
            let formData = new FormData();
            formData.append("image", this.file);
            formData.append("text", this.modelValue);
            console.log("file = " + this.file);

            axios({method:'put', url: urlDesti, data: formData, headers: headersToPass})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        changeInputContent(content) {
            this.$emit('update:modelValue', content)
        },
        reloadPageAfterChange() {
            this.$refs.PostComponent.getAllPosts();
        }
    }
}
</script>