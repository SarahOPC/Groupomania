<template>
    <div>
        <div v-for="post in posts" :key="post.id" >{{ post.userId }} - {{ post.text }}
            <div v-if="(typeof post.image) == 'string' ">
                <img crossorigin="anonymous" :src="post.image" alt="image du post">
            </div>
            <InputSubmit v-on:click="updatePosts()" content="Modifier" />
            <InputSubmit content="Supprimer" /><br>
            <InputSubmit content="J'aime" />
            <InputSubmit content="Je n'aime pas" /><br>
            <input type="text" id="comments" name="comments" placeholder="Mon commentaire">
            <InputSubmit content="Publier" />
            <InputSubmit content="Modifier" />
            <InputSubmit content="Supprimer" /><br>
        </div>
    </div>
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import axios from 'axios'

export default {
    name: 'postComponent',
    components: {
        InputSubmit
    },
    beforeMount() {
        this.getAllPosts();
    },
    data() {
        return {
            posts: ''
        }
    },
    /* computed: {
        sortedPosts: function() {
            return this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
    }, */
    methods: {
        getAllPosts: function() {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/";

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    return self.posts = response.data.result.slice().reverse();
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        updatePosts() {
            //--------------------------------------- postId----------------------------------//
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
img {
    width: 15%;
    height: 15%;
}
</style>