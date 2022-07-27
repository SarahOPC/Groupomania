<template>
<nav>
  <router-link to="/profil"><font-awesome-icon data-bs-toggle="tooltip" title="Mon profil" icon="fa-solid fa-address-card"  size="lg" 
  :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" /></router-link>
  <router-link to="/logout"><font-awesome-icon data-bs-toggle="tooltip" title="Me déconnecter" icon="fa-solid fa-right-from-bracket" 
  size="lg" :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }"  /></router-link>
  <font-awesome-icon data-toggle="modal" data-target="#mediatorModal" data-bs-toggle="tooltip" title="Rôle du médiateur" icon="fa-solid fa-user-secret" size="lg"
   :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" />
</nav>
  <router-view></router-view>
    <div class="container">
      <form>
          <AreaForText />
      </form>
        
      <div class="previousPost">
          <PostComponent />
      </div><br>

    <div class="modal fade" id="modalCenter" tabindex="-1" role="dialog" aria-labelledby="modalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLongTitle">Rôle du médiateur</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Le médiateur de ce site est présent afin que les échanges restent courtois et sympathiques en tout temps.</p>
        <p>Cet espace vous ait réservé afin de vous détendre et de pouvoir communiquer plus facilement avec vos collègues</p>
        <p>Le médiateur pourra supprimer au besoin et selon sa seule opinion tous post ou commentaire contraires à nos valeurs d'entreprise</p>
        <p>Merci d'avance de votre collaboration et bon partage</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

    </div>
</template>

<script>
// @ is an alias to /src
import AreaForText from '@/components/AreaForText.vue'
import PostComponent from '@/components/PostComponent.vue'

export default {
    name: 'main-news-feed-view',
    components: {
    AreaForText,
    PostComponent
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