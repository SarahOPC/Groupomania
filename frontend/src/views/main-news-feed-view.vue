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
    <div class="previousPost">
      <PostComponent />
    </div><br>
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'
import ModeratorModal from '@/components/ModeratorModal.vue'

export default {
  name: 'main-news-feed-view',
  components: {
    PostComponent,
    ModeratorModal
  },
  data() {
    return {
      showModal: false,
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

@media only screen and (min-width: 768px) and (max-width: 1150px) and (orientation: landscape) {
    nav {
      font-size: x-large;
    }
}



</style>