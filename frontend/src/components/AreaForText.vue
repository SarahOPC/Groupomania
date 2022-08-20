<template>
    <div>
        <textarea v-model="text" name="newPostFromUser" rows="7" cols="50"
            placeholder="Envie de partager quelque chose...?"></textarea><br>
        <label for="imagePost">Ajouter une image (.jpg ou .png)</label><br>
        <input @change="retrieveImage" type="file" id="fileName" name="fileName"><br>
        <div @click="createPosts(); $emit('reloadPostsPage');">
            <font-awesome-icon data-bs-toggle="tooltip" title="Publier"
            icon="fa-solid fa-paper-plane" size="lg" 
            :style="{ color: '#FFD7D7', 'margin-right': '0.5em', cursor: 'pointer' }"
            onmouseover="this.style.color='#FD2D01';" onmouseout="this.style.color='#FFD7D7';" />
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            text: "",
            file: ""
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
        retrieveImage(e) {
            return this.file = e.target.files[0];
        },
        createPosts() {
            let self = this;
            let userValidToken = self.getUserValidToken();
            let id = self.getUserIdFromSessionStorage();
            let urlDesti = process.env.VUE_APP_BACKEND_URL + "/" + id;
            const headersToPass = { 'Authorization': 'Bearer ' + userValidToken, 'Content-Type': 'multipart/form-data' };
            let formData = new FormData();
            formData.append("image", self.file);
            formData.append("text", self.text);

            axios({ method: 'post', url: urlDesti, data: formData, headers: headersToPass })
                .then(function (response) {
                    if (response.status === 200) {
                        window.location.reload();
                    } else {
                        self.throwUnexpectedServerError(response.status, response.statusText);
                        alert(response.status + " / " + response.statusText);
                    }
                })
                .catch(function (error) {
                    if(error.response.status === 400) {
                        alert("Ce n'est pas un format que nous acceptons. Nous acceptons les .jpeg, .jpg et .png");
                    } else {
                        self.throwUnexpectedServerError(error.response.status, error.message);
                        alert(error.response.staus + " / " + error.message);
                    }
                })
        }
    }
}
</script>

<style scoped>
textarea {
    border-radius: 0.5em;
    border-color: #FD2D01;
    border-style: dotted;
    margin-bottom: 1.5em;
    box-shadow: 0.4em 0.4em 0.4em #FD2D01;
    width: 20em;
}

#fileName,
label {
    text-align-last: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    color: #FFD7D7;
}

@media (max-width: 600px) {
    textarea {
        width: 18em;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1150px) and (orientation: landscape) {
    textarea {
        width: 25em;
    }
}

</style>