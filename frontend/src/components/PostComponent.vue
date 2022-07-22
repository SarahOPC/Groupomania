<template>

<div class="container" v-for="post in posts" :key="post.id">{{ post.userId }} - {{ post.text }}
    <div v-if="(typeof post.image) == 'string' ">
        <img crossorigin="anonymous" :src="post.image" alt="image du post">
    </div>
    <div>
        <InputSubmit v-bind:postIds="post.id" v-on:click="getOnePost(post.id)" content="Modifier" />
        <font-awesome-icon icon="fa-solid fa-pencil" size="lg" :style="{ color: '#4E5166' }" />
        <div v-if="displayPostUpdate">
            <AreaForUpdatingPost v-model="post.text" v-model:postId="post.id" @reloadPostsPage="getAllPosts()"/>
        </div>
    </div>
    <InputSubmit v-on:click="deleteOnePost(post.id)" content="Supprimer" />
    <font-awesome-icon icon="fa-solid fa-trash-can" size="lg" :style="{ color: '#4E5166' }" /><br>
    <InputSubmit v-on:click="likingOnePost(post.id)" content="J'aime" />
    <font-awesome-icon icon="fa-regular fa-face-smile" size="lg" :style="{ color: '#4E5166' }" />
    <font-awesome-icon icon="fa-solid fa-face-smile" size="lg" :style="{ color: '#4E5166' }" />
    <InputSubmit v-on:click="dislikingOnePost(post.id)" content="Je n'aime pas" />
    <font-awesome-icon icon="fa-regular fa-face-frown" size="lg" :style="{ color: '#4E5166' }" />
    <font-awesome-icon icon="fa-solid fa-face-frown" size="lg" :style="{ color: '#4E5166' }" /><br>

    <InputSubmit v-bind:postIds="post.id" v-on:click="getAllComments(post.id)" content="Voir tous les commentaires" />
    <font-awesome-icon icon="fa-solid fa-comments" size="lg" :style="{ color: '#4E5166' }" /><br>
    <div v-if="displayCommentsArea == post.id">
        <div v-for="comment in comments" :key="comment.id">{{ comment.userId }} - {{ comment.text }}
            <InputSubmit v-bind:commentIds="comment.id" v-on:click="deleteOneComment(post.id, comment.id)" content="Supprimer mon commentaire" />
            <font-awesome-icon icon="fa-solid fa-circle-minus" size="lg" :style="{ color: '#4E5166' }" /><br>
        </div>
    </div>

    <InputSubmit v-on:click="getOnePostForComments(post.id)" content="Ajouter un commentaire" />
    <font-awesome-icon icon="fa-solid fa-circle-plus" size="lg" :style="{ color: '#4E5166' }" /><br>
    <div v-if="displayNewCommentArea">
        <input v-model="text" type="text" id="comments" name="comments" placeholder="Mon commentaire">
        <InputSubmit v-on:click="addOneComment(post.id)" content="Publier mon commentaire" />
        <font-awesome-icon icon="fa-solid fa-check-circle" size="lg" :style="{ color: '#4E5166' }" />
    </div>
    

</div>
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'
import AreaForUpdatingPost from '@/components/AreaForUpdatingPost.vue'
import axios from 'axios'

export default {
    name: 'postComponent',
    components: {
    InputSubmit,
    AreaForUpdatingPost
    },
    beforeMount() {
        this.getAllPosts();
    },
    props: {
        postIds: Number,
        commentIds: Number
    },
    data() {
        return {
            posts: '',
            postId: this.postIds,
            displayPostUpdate: false,
            text: '',
            comments: '',
            commentId: this.commentIds,
            displayNewCommentArea: false,
            displayCommentsArea: ''
        }
    },
    methods: {
        getAllPosts() {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/";

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    self.displayPostUpdate =false;
                    return self.posts = response.data.result.slice().reverse();
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        getAllComments(postId) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/comment";

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    self.displayCommentsArea = postId;
                    return self.comments = response.data.result.slice().reverse();
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        getOnePost(postId) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    self.displayPostUpdate = true;
                    return self.posts = response.data.result;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        deleteOnePost(postId) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({method:'delete', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    alert("Votre post vient d'être supprimé");
                    self.getAllPosts();
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        getOnePostForComments(postId) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    self.displayNewCommentArea = true;
                    return self.posts = response.data.result;
                    
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        addOneComment(postId) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/comment";

            axios({method:'post', url: urlDesti, data: {text: this.text}, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    self.getAllPosts();
                    self.displayNewCommentArea = false;
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        deleteOneComment(postId, commentId) {
            let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/" + commentId + "/comment";

            axios({method:'delete', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response);
                    alert("Votre commentaire vient d'être supprimé");
                    self.getAllComments(postId);
                }
            })
            .catch(function(error) {
                console.log(error);
            })
        },
        likingOnePost(postId) {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let likesdislikes = 1;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({method:'post', url: urlDesti, data: {likesdislikes: likesdislikes}, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response.data.results.insertId);
                    console.log(response);
                }
            })

            .catch(function(error) {
                console.log(error);
            })
        },
        dislikingOnePost(postId) {
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let id = sessionStorage.getItem('userId');
            let likesdislikes = -1;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({method:'post', url: urlDesti, data: {likesdislikes: likesdislikes}, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    console.log(response.data.results.insertId);
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

.container {
    padding: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 0.5em;
    border-color: #4E5166;
    border-style: groove;
    color: #4E5166;
    font-weight: bold;
    box-shadow: 0.4em 0.4em 0.4em #FD2D01;
    width: 50%;
    background-color: #FFFFFF;
}

img {
    width: 50%;
    height: 50%;
    box-shadow: 0.4em 0.4em 0.4em #FD2D01;
    margin-top: 1em;
    margin-bottom: 1.5em;
}

</style>