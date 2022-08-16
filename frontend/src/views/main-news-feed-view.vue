<template>
  <nav>
    <div class="icons">
      <div @mouseover="hover = true" @mouseout="hover = false">
        <router-link to="/profil">
          <div v-if="!hover">
            <font-awesome-icon data-bs-toggle="tooltip" title="Mon profil" icon="fa-solid fa-address-card" size="lg"
              :style="{ color: '#FFD7D7', 'margin': '1em' }" />
          </div>
          <div v-if="hover">
          <font-awesome-icon data-bs-toggle="tooltip" title="Mon profil" icon="fa-solid fa-address-card" size="lg"
            :style="{ color: '#FD2D01', 'margin': '1em' }" />
          </div>
        </router-link>
      </div>

      <div @mouseover="hover = true" @mouseout="hover = false">
        <div v-if="!hover">
          <font-awesome-icon @click="showModalModerator = true" data-bs-toggle="tooltip" title="Rôle du modérateur" icon="fa-solid fa-user-secret" size="lg"
            :style="{ color: '#FFD7D7', 'margin': '1em', cursor: 'pointer' }" />
        </div>
        <div v-if="hover">
          <font-awesome-icon @click="showModalModerator = true" data-bs-toggle="tooltip" title="Rôle du modérateur" icon="fa-solid fa-user-secret" size="lg"
            :style="{ color: '#FD2D01', 'margin': '1em', cursor: 'pointer' }" />
        </div>
          <MultipleModal v-if="showModalModerator" @close-modal-moderator="showModalModerator = false" isQuestion="false" content="Le rôle du modérateur sur ce site est de permettre et de faciliter les échanges courtois entre collègues.
            Ce site a pour seul but de vous donner la possibilité de discuter de tout entre vous, que cela concerne le travail ou pas.
            Le modérateur se réserve le droit de modifier ou supprimer selon son propre avis tout post ou commentaire considéré comme ne respectant pas l'esprit de notre entreprise
            Merci de votre compréhension et de votre collaboration pour garder cet espace de détente sain et agréable" />
      </div>

      <div @mouseover="hover = true" @mouseout="hover = false">
        <router-link to="/logout">
          <div v-if="!hover">
            <font-awesome-icon data-bs-toggle="tooltip" title="Me déconnecter" icon="fa-solid fa-right-from-bracket" size="lg"
              :style="{ color: '#FFD7D7', 'margin': '1em' }" />
          </div>
          <div v-if="hover">
          <font-awesome-icon data-bs-toggle="tooltip" title="Me déconnecter" icon="fa-solid fa-right-from-bracket" size="lg"
            :style="{ color: '#FD2D01', 'margin': '1em' }" />
          </div>
        </router-link>
      </div>
    </div>
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
      showModalModerator: false,
      hover: false
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

.icons {
  display: flex;
  justify-content: center;
}

@media only screen and (min-width: 768px) and (max-width: 1150px) and (orientation: landscape) {
    nav {
      font-size: x-large;
    }
}



</style>