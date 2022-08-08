<template>
    <div>
      <AreaForText @reloadPostsPage="getAllPosts()"/>
    </div>

    <div class="container" v-for="post in posts" :key="post.id">
        <img crossorigin="anonymous" :src="post.avatar" alt="Avatar" class="rounded-3"
            style="width: 2em; margin-right: 1em; box-shadow: none;" />
        {{ post.text }}
        <div v-if="(typeof post.image) == 'string'">
            <img crossorigin="anonymous" :src="post.image" alt="image du post">
        </div>

        <div class="iconsPlacement">
            <div @click="getOnePost(post.id)" v-if="post.userId == getUserIdFromSessionStorage() || post.role == 'Admin'">
                <font-awesome-icon data-bs-toggle="tooltip" title="Modifier"
                icon="fa-solid fa-pencil" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>

            <div @click="deleteOnePost(post.id)"  v-if="post.userId == getUserIdFromSessionStorage() || post.role == 'Admin'">
                <font-awesome-icon data-bs-toggle="tooltip" title="Supprimer"
                icon="fa-solid fa-trash-can" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>

            <div v-if="post.liked === 0 || post.liked == null" @click="likingOnePost(post.id, post.liked)">
                <font-awesome-icon data-bs-toggle="tooltip" title="J'aime"
                icon="fa-regular fa-face-smile" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>
            
            <div v-if="post.liked === 1" @click="unlikingOnePost(post.id, post.liked)">
                <font-awesome-icon data-bs-toggle="tooltip" title="J'aime"
                icon="fa-solid fa-face-smile" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>
            
            <div v-if="post.liked === 0 || post.liked == null" @click="dislikingOnePost(post.id, post.liked)">
                <font-awesome-icon data-bs-toggle="tooltip" title="Je n'aime pas"
                icon="fa-regular fa-face-frown" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>
            
            <div v-if="post.liked === -1" @click="undislikingOnePost(post.id, post.liked)">
                <font-awesome-icon data-bs-toggle="tooltip" title="Je n'aime pas"
                icon="fa-solid fa-face-frown" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>

            <div v-if="displayPostUpdate">
                <AreaForUpdatingPost v-model="post.text" v-model:postId="post.id" @reloadPostsPage="getAllPosts()" />
            </div>

            <div @click="getAllComments(post.id)">
                <font-awesome-icon data-bs-toggle="tooltip" title="Voir tous les commentaires"
                icon="fa-solid fa-comments" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>

            <div v-if="displayCommentsArea == post.id">
                <div v-for="comment in comments" :key="comment.id">{{ comment.userId }} - {{ comment.text }}
                    <div @click="deleteOneComment(post.id, comment.id)" v-if="post.userId == getUserIdFromSessionStorage() || post.role == 'Admin'">
                        <font-awesome-icon data-bs-toggle="tooltip" title="Supprimer mon commentaire"
                        icon="fa-solid fa-circle-minus" size="lg"
                        :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
                    </div>
                </div>
            </div>

            <div @click="getOnePostForComments(post.id)">
                <font-awesome-icon data-bs-toggle="tooltip" title="Ajouter un commentaire"
                icon="fa-solid fa-circle-plus" size="lg"
                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }" />
            </div>

            <div v-if="displayNewCommentArea">
                <input v-model="text" type="text" id="comments" name="comments" placeholder="Mon commentaire">
                <div @click="addOneComment(post.id)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="Publier mon commentaire"
                    icon="fa-solid fa-check-circle" size="lg"
                    :style="{ color: '#4E5166', 'margin-left': '0.5em', cursor: 'pointer' }" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AreaForUpdatingPost from '@/components/AreaForUpdatingPost.vue'
import AreaForText from '@/components/AreaForText.vue'
import axios from 'axios'

export default {
    name: 'postComponent',
    components: {
        AreaForUpdatingPost,
        AreaForText
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
        getUserIdFromSessionStorage() {
            let id = sessionStorage.getItem('userId');
            return id;
        },
        getAllPosts() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id;
            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayPostUpdate = false;
                        return self.posts = response.data.result.slice().reverse();
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        getAllComments(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/comment";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayCommentsArea = postId;
                        return self.comments = response.data.result.slice().reverse();
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        getOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayPostUpdate = true;
                        return self.posts = response.data.result;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        deleteOnePost(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({ method: 'delete', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.getAllPosts();
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    if(error.response.status === 401) {
                        alert("Vous n'êtes pas autorisé à faire cette action");
                    } else {
                        this.throwUnexpectedServerError(error.response.status, error.message);
                    }
                })
        },
        getOnePostForComments(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId;

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.displayNewCommentArea = true;
                        return self.posts = response.data.result;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        addOneComment(postId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/comment";

            axios({ method: 'post', url: urlDesti, data: { text: this.text }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        self.getAllPosts();
                        return self.displayNewCommentArea = false;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        deleteOneComment(postId, commentId) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/" + commentId + "/comment";

            axios({ method: 'delete', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response);
                        return self.getAllComments(postId);
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                })
        },
        likingOnePost(postId, liked) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let likesdislikes = 1;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response + " " + liked);
                        self.getAllPosts();
                        return self.liked = 1;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })

                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                });
        },
        unlikingOnePost(postId, liked) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let likesdislikes = 0;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response + " " + liked);
                        self.getAllPosts();
                        return self.liked = 0;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })

                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                });
        },
        dislikingOnePost(postId, liked) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let likesdislikes = -1;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response + " " + liked);
                        self.getAllPosts();
                        return self.liked = -1;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
                });
        },
        undislikingOnePost(postId, liked) {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let likesdislikes = 0;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/" + postId + "/like";

            axios({ method: 'post', url: urlDesti, data: { likesdislikes: likesdislikes }, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log(response + " " + liked);
                        self.getAllPosts();
                        return self.liked = 0;
                    } else {
                        this.throwUnexpectedServerError(response.status, response.statusText);
                    }
                })
                .catch(function (error) {
                    this.throwUnexpectedServerError(error.response.status, error.message);
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

.iconsPlacement {
    display: inline-flex;
}

</style>