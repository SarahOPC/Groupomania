<template>
    <div>
        <!--<div v-for="(text, image) in posts">{{ text }} - {{ image }} :key="index"</div>-->
        {{ text }}
        <img crossorigin="anonymous" :src="image" alt="image du post">

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
            image: '',
            text: ''
        }
    },
    methods: {
        getAllPosts: function() {
            //let self = this;
            let validToken = sessionStorage.getItem('userToken');
            let userValidToken = validToken.replace(/['"]+/g, '');
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/";

            axios({method:'get', url: urlDesti, headers:{'Authorization': 'Bearer ' + userValidToken}})
            .then(function(response) {
                if(response.status === 200) {
                    return response;
                    //return {self.text: response.data.result[1].text,
                            //self.image: response.data.result[1].image}
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