<template>
    <div>
        <div v-for="post in posts" :key="post.id">{{ post.id }} - {{ post.userId }} - {{ post.text }}
            <div v-if="(typeof post.image) == 'string' ">
                <img crossorigin="anonymous" :src="post.image" alt="image du post">
            </div>
            <InputSubmit v-bind:postIds="post.id" v-on:click="updateOnePost()" content="Modifier" />
            <!--<div v-if=""> ---------------------au clic sur modifier------------------------->
                <!--<AreaForText />
            </div>-->
            <InputSubmit v-on:click="deleteOnePost()" content="Supprimer" /><br>
            <InputSubmit v-on:click="ratingOnePost()" content="J'aime" />
            <InputSubmit v-on:click="ratingOnePost()" content="Je n'aime pas" /><br>
            <input type="text" id="comments" name="comments" placeholder="Mon commentaire">
            <InputSubmit v-on:click="addOneComment()" content="Publier" />
            <InputSubmit v-on:click="deleteOneComment()" content="Supprimer" /><br>
        </div>
    </div>
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
//import AreaForText from '@/components/AreaForText.vue'
import axios from 'axios'

export default {
    name: 'postComponent',
    components: {
    InputSubmit,
    //AreaForText
},
    beforeMount() {
        this.getAllPosts();
    },
    props: {
        postIds: Number
    },
    data() {
        return {
            posts: '',
            postId: this.postIds
        }
    },
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
        updateOnePost() {
            //--------------------------------------- postId----------------------------------//
            //--------------------------------------- AreaForText-----------------------------//
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let postId = self.postId;
            console.log(postId);
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
        },
        /* deleteOnePost() {
            //--------------------------------------- postId----------------------------------//
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({method:'delete', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    alert("Votre post vient d'être supprimé");
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        addOneComment() {
            //--------------------------------------- postId----------------------------------//
            //--------------------------------------- commentId----------------------------------//
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/comment";

            axios({method:'delete', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    alert("Votre post vient d'être supprimé");
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        deleteOneComment() {
            //--------------------------------------- postId----------------------------------//
            //--------------------------------------- commentId----------------------------------//
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + commentId + "/comment";

            axios({method:'delete', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    alert("Votre post vient d'être supprimé");
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        ratingOnePost() {

        } */
    }
}
</script>

<style scoped>
img {
    width: 15%;
    height: 15%;
}
</style>