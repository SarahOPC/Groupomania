<template>
  <nav>
    <router-link to="/profil">
      <font-awesome-icon data-bs-toggle="tooltip" title="Mon profil" icon="fa-solid fa-address-card" size="lg"
        :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" />
    </router-link>

    <font-awesome-icon @click="showModal = true" @close-modal="showModal = false" data-bs-toggle="tooltip" title="Rôle du modérateur" icon="fa-solid fa-user-secret" size="lg"
      :style="{ color: '#FFD7D7', 'margin-right': '1.5em', cursor: 'pointer' }" />
      <ModeratorModal v-show="showModal" @close-modal="showModal = false" />

    <router-link to="/logout">
      <font-awesome-icon data-bs-toggle="tooltip" title="Me déconnecter" icon="fa-solid fa-right-from-bracket" size="lg"
        :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" />
    </router-link>
  </nav>
  <router-view></router-view>
  <div class="container">
    <form>
      <AreaForText @reloadPostsPage="getAllPosts()"/>
    </form>

    <div class="previousPost">
      <PostComponent />
    </div><br>
  </div>
</template>

<script>
// @ is an alias to /src
import AreaForText from '@/components/AreaForText.vue'
import PostComponent from '@/components/PostComponent.vue'
import ModeratorModal from '@/components/ModeratorModal.vue'
import axios from 'axios'

export default {
  name: 'main-news-feed-view',
  components: {
    AreaForText,
    PostComponent,
    ModeratorModal
  },
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
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
        }
  }
}

</script>

<style scoped>
.container {
  margin-top: 3em;
}

nav a {
  font-weight: bold;
  color: #FFD7D7;
}

nav a.router-link-exact-active {
  color: #FD2D01;
}

.previousPost {
  margin: 1.5em;
}
</style>