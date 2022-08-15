<template>
  <nav>
    <router-link to="/profil">
      <font-awesome-icon data-bs-toggle="tooltip" title="Mon profil" icon="fa-solid fa-address-card" size="lg"
        :style="{ color: '#FFD7D7', 'margin': '1em' }" />
    </router-link>

    <font-awesome-icon @click="showModal = true" data-bs-toggle="tooltip" title="Rôle du modérateur" icon="fa-solid fa-user-secret" size="lg"
      :style="{ color: '#FFD7D7', 'margin': '1em', cursor: 'pointer' }" />
      <MultipleModal v-show="showModal" @close-modal="showModal = false" />

    <router-link to="/logout">
      <font-awesome-icon data-bs-toggle="tooltip" title="Me déconnecter" icon="fa-solid fa-right-from-bracket" size="lg"
        :style="{ color: '#FFD7D7', 'margin': '1em' }" />
    </router-link>
  <h1>Fil d'actualité</h1>
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
import MultipleModal from '@/components/MultipleModal.vue'

export default {
  name: 'main-news-feed-view',
  components: {
    PostComponent,
    MultipleModal
  },
  data() {
    return {
      showModal: false,
    }
  }
}

</script>

<style scoped>

h1 {
  color:#FFD7D7;
  margin-top: 1em;
  font-weight: bold;

}

.container {
  margin-top: 3em;
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