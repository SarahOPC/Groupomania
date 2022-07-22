<template>
    <div>
        <textarea type="text" name="newPostFromUser" rows="7" cols="50" :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"></textarea><br>
        <label for="imagePost">Changer l'image (.jpg ou .png)</label>
        <input @change="retrieveImage" type="file" id="fileName" name="fileName"><br>
        <InputSubmit v-on:click="updateOnePost(postId)" content="Publier mon post modifié" /><br>
        <font-awesome-icon icon="fa-solid fa-paper-plane" size="lg" :style="{ color: '#FFD7D7' }"/>

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
        retrieveImage(e) {
            return this.file = e.target.files[0];
        },
        updateOnePost(postId) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;
            const headersToPass = {'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data'};
            let formData = new FormData();
            formData.append("image", this.file);
            formData.append("text", this.modelValue);
            console.log(this.file);
            console.log(this.modelValue);

            axios({method:'put', url: urlDesti, data: formData, headers: headersToPass})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    return self.$emit('reloadPostsPage');
                }
            })
            .catch(function(error) {
                console.log(error);
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
}

</style>