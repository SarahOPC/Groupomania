<template>
<nav>
  <router-link to="/profil"><font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" title="Mon profil" icon="fa-solid fa-address-card"  size="lg" :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" /></router-link>
  <!--<router-link to="/logout">Se déconnecter</router-link>-->
  <font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" title="Se déconnecter" icon="fa-solid fa-right-from-bracket"  size="lg" :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" />
  <font-awesome-icon data-bs-toggle="tooltip" data-bs-placement="top" title="Rôle du médiateur" icon="fa-solid fa-user-secret" size="lg" :style="{ color: '#FFD7D7', 'margin-right': '1.5em' }" />
</nav>
  <router-view></router-view>
    <div class="container">
      <form>
          <AreaForText />
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