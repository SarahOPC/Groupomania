<template>


    <div>
        <AreaForText @reloadPostsPage="getAllPosts()" />
    </div>

    <div class="container" v-for="post in posts" :key="post.id">
        <img crossorigin="anonymous" :src="post.avatar" alt="Avatar" class="rounded-3"
            style="width: 2em; margin-right: 1em; box-shadow: none;" />
        {{ post.text }}
        <div v-if="(typeof post.image) == 'string'">
            <img crossorigin="anonymous" :src="post.image" alt="image du post">
        </div><br>

        <div class="iconsPlacement">
            <div class="firstPartNoComment">
                <div @click="getOnePost(post.id)" v-if="isPostEditable(post.userId)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="Modifier" icon="fa-solid fa-pencil" size="lg"
                        :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                </div>

                <div @click="deleteOnePost(post.id)" v-if="isPostEditable(post.userId)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="Supprimer" icon="fa-solid fa-trash-can" size="lg"
                        :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                </div>

                <div v-if="post.liked === 0 || post.liked == null" @click="likingOnePost(post.id, post.liked)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="J'aime" icon="fa-regular fa-face-smile" size="lg"
                        :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                </div>

                <div v-if="post.liked === 1" @click="unlikingOnePost(post.id, post.liked)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="J'aime" icon="fa-solid fa-face-smile" size="lg"
                        :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                </div>

                <div v-if="post.liked === 0 || post.liked == null" @click="dislikingOnePost(post.id, post.liked)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="Je n'aime pas" icon="fa-regular fa-face-frown"
                        size="lg" :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                </div>

                <div v-if="post.liked === -1" @click="undislikingOnePost(post.id, post.liked)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="Je n'aime pas" icon="fa-solid fa-face-frown"
                        size="lg" :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                </div>

                <div v-if="displayPostUpdate">
                    <AreaForUpdatingPost v-model="post.text" v-model:postId="post.id"
                        @reloadPostsPage="getAllPosts()" />
                </div>

                <div class="allComments" @click="getAllComments(post.id)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="Zone commentaires"
                        icon="fa-solid fa-comments" size="lg"
                        :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                </div>
            </div>
                <div class="secondPart" v-if="displayCommentsArea == post.id">
                    <div class="comment" v-for="comment in comments" :key="comment.id">
                        <div class="avatarCommentPlacement">
                            <img crossorigin="anonymous" :src="post.avatar" alt="Avatar" class="rounded-3"
                                style="width: 2em; margin-right: 1em; box-shadow: none;" />
                        </div>
                        <div class="textCommentPlacement">{{ comment.text }}</div>
                        <div v-if="isPostEditable(comment.userId)" @click="deleteOneComment(post.id, comment.id)">
                            <font-awesome-icon data-bs-toggle="tooltip" title="Supprimer mon commentaire"
                                icon="fa-solid fa-circle-minus" size="lg"
                                :style="{ color: '#4E5166', 'margin-right': '0.5em', cursor: 'pointer' }"
                                onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
                        </div>
                    </div>
                </div>

            <div class="comment" v-if="displayNewCommentArea == post.id">
                <input v-model="text" type="text" name="comments" placeholder="Ajouter un commentaire">
                <div @click="addOneComment(post.id)">
                    <font-awesome-icon data-bs-toggle="tooltip" title="Publier mon commentaire"
                        icon="fa-solid fa-check-circle" size="lg"
                        :style="{ color: '#4E5166', 'margin-left': '0.5em', cursor: 'pointer' }"
                        onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#4E5166';" />
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
            displayNewCommentArea: '',
            displayCommentsArea: ''
        }
    },
    methods: {
        isPostEditable(userId) {
            let userIdFromStorage = this.getUserIdFromSessionStorage();
            let userRoleFromStorage = sessionStorage.getItem("userRole");
            return userId.toString() === userIdFromStorage || userRoleFromStorage === 'Admin';
        },
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
            return sessionStorage.getItem('userId');
        },
        async getUserRole() {
            let userValidToken = this.getUserValidToken();
            let id = this.getUserIdFromSessionStorage();
            let self = this;
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id + "/profil";

            axios({ method: 'get', url: urlDesti, headers: { 'Authorization': 'Bearer ' + userValidToken } })
                .then(function (response) {
                    if (response.status === 200) {
                        self.role = response.data.result[0].role;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
                })
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
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        self.displayNewCommentArea = postId;
                        return self.comments = response.data.result.slice().reverse();
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        return self.getAllPosts();
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        alert("Vous n'êtes pas autorisé à faire cette action");
                    } else {
                        alert(this.throwUnexpectedServerError(error.response.status, error.message));
                    }
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
                        self.getAllPosts();
                        self.getAllComments(postId);
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        return self.getAllComments(postId);
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        console.log(liked);
                        self.getAllPosts();
                        return self.liked = 1;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })

                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        console.log(liked);
                        self.getAllPosts();
                        return self.liked = 0;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })

                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        console.log(liked);
                        self.getAllPosts();
                        return self.liked = -1;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
                        console.log(liked);
                        self.getAllPosts();
                        return self.liked = 0;
                    } else {
                        alert(this.throwUnexpectedServerError(response.status, response.statusText));
                    }
                })
                .catch(function (error) {
                    alert(this.throwUnexpectedServerError(error.response.status, error.message));
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
    width: 70%;
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
    display: inline-block;
}

.firstPartNoComment {
    display: flex;
    justify-content: center;
}

.comment {
    display: inline-flex;
    margin-top: 1em;
    justify-content: center;
}

.secondPart div {
    display: flex;
    align-items: center;
}

.textCommentPlacement {
    margin-right: 1em;
}

@media (max-width: 600px) {
    .container {
        width: 93%;
    }
}
</style>