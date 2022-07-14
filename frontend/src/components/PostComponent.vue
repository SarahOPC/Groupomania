<template>
    <div>
        <div v-for="post in posts" :key="post.id" >{{ post.userId }} - {{ post.text }}
            <div v-if="post.image != '' || post.image != null">
                <img crossorigin="anonymous" :src="post.image" alt="image du post">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'postComponent',
    beforeMount() {
        this.getAllPosts();
    },
    data() {
        return {
            posts: ''
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
                    /* for(let i = 0; i < response.data.result.length; i ++) {
                        let text = response.data.result[i].text;
                        let image = response.data.result[i].image;
                        let userId = response.data.result[i].userId;
                        let post = {text, image, userId};
                        return post; 
                    }*/
                    //return self.posts = this.post;
                    return self.posts = response.data.result;
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
</style>