<template>
    <div class="container" v-for="post in posts" :key="post.id">
        <img crossorigin="anonymous" v-if="avatar !== ''" :src="avatar" alt="Avatar" class="rounded-3"
            style="width: 2em; margin-right: 1em; box-shadow: none;" />
        {{ post.text }}
        <div v-if="(typeof post.image) == 'string'">
            <img crossorigin="anonymous" :src="post.image" alt="image du post">
        </div>
        <div>

            <font-awesome-icon data-bs-toggle="tooltip" title="Modifier" v-bind:postIds="post.id"
                @click="getOnePost(post.id)" icon="fa-solid fa-pencil" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />

            <div>
                <font-awesome-icon data-bs-toggle="tooltip" title="Supprimer" v-bind:postIds="post.id" 
                    @click.stop="deleteOnePost(post.id)" icon="fa-solid fa-trash-can" size="lg"
                    :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />

                <font-awesome-icon v-if="liked == 0" data-bs-toggle="tooltip" title="J'aime" v-bind:postIds="post.id" 
                    @click.stop="likingOnePost(post.id)" icon="fa-regular fa-face-smile" size="lg"
                    :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />

                <font-awesome-icon v-if="liked == 1" data-bs-toggle="tooltip" title="J'aime" v-bind:postIds="post.id" 
                    @click.stop="unlikingOnePost(post.id)" icon="fa-solid fa-face-smile" size="lg"
                    :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />

                <font-awesome-icon v-if="disliked == 0" data-bs-toggle="tooltip" title="Je n'aime pas" v-bind:postIds="post.id" 
                    @click.stop="dislikingOnePost(post.id)" icon="fa-regular fa-face-frown" size="lg"
                    :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />

                <font-awesome-icon v-if="disliked == 1" data-bs-toggle="tooltip" title="Je n'aime pas" v-bind:postIds="post.id" 
                    @click.stop="undislikingOnePost(post.id)" icon="fa-solid fa-face-frown" size="lg"
                    :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" /><br>
            </div>

            <div v-if="displayPostUpdate">
                <AreaForUpdatingPost v-model="post.text" v-model:postId="post.id" @reloadPostsPage="getAllPosts()" />
            </div>
        </div>
                
        <font-awesome-icon data-bs-toggle="tooltip" title="Voir tous les commentaires" v-bind:postIds="post.id"
            @click="getAllComments(post.id)" icon="fa-solid fa-comments" size="lg"
            :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" /><br>
        <div v-if="displayCommentsArea == post.id">
            <div v-for="comment in comments" :key="comment.id">{{ comment.userId }} - {{ comment.text }}
                <font-awesome-icon data-bs-toggle="tooltip" title="Supprimer mon commentaire"
                    v-bind:commentIds="comment.id" @click="deleteOneComment(post.id, comment.id)"
                    icon="fa-solid fa-circle-minus" size="lg"
                    :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" /><br>
            </div>
        </div>

        <font-awesome-icon data-bs-toggle="tooltip" title="Ajouter un commentaire"
            @click="getOnePostForComments(post.id)" icon="fa-solid fa-circle-plus" size="lg"
            :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" /><br>
        <div v-if="displayNewCommentArea">
            <input v-model="text" type="text" id="comments" name="comments" placeholder="Mon commentaire">
            <font-awesome-icon data-bs-toggle="tooltip" title="Publier mon commentaire"
                @click="addOneComment(post.id)" icon="fa-solid fa-check-circle" size="lg"
                :style="{ color: '#4E5166', 'margin-left': '0.5em', cursor: 'pointer' }" />
        </div>
    </div>
</template>

<script>
import AreaForUpdatingPost from '@/components/AreaForUpdatingPost.vue'
import axios from 'axios'

export default {
    name: 'postComponent',
    components: {
       AreaForUpdatingPost
    },
    beforeMount() {
        this.getAllPosts();
        this.getAvatar();
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
            displayCommentsArea: '',
            avatar: '',
            liked: 0,
            disliked: 0
        }
    },
    methods: {
        getAvatar() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        return self.avatar = response.data.result[0].avatar;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
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
        getAllPosts() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id;
            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayPostUpdate = false;
                        return self.posts = response.data.result.slice().reverse();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getAllComments(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/comment";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayCommentsArea = postId;
                        return self.comments = response.data.result.slice().reverse();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayPostUpdate = true;
                        return self.posts = response.data.result;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        deleteOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({ method: 'delete', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.getAllPosts();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getOnePostForComments(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayNewCommentArea = true;
                        return self.posts = response.data.result;

                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        addOneComment(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/comment";

            axios({ method: 'post', url: urlDesti, data: { text: this.text }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        self.getAllPosts();
                        return self.displayNewCommentArea = false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        deleteOneComment(postId, commentId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/" + commentId + "/comment";

            axios({ method: 'delete', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.getAllComments(postId);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        likingOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let likesdislikes = 1;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.liked = 1;
                    }
                })

                .catch(function (error) {
                    console.log(error);
                });
        },
        unlikingOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let likesdislikes = 0;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.liked = 0;
                    }
                })

                .catch(function (error) {
                    console.log(error);
                });
        },
        dislikingOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let likesdislikes = -1;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.disliked = 1;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        undislikingOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromLocalStorage();
            let self = this;
            let likesdislikes = 0;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.disliked = 0;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
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