<template>
<nav>
  | <router-link to="/profil">Voir mon profil</router-link>
  <font-awesome-icon icon="fa-solid fa-address-card" /> | 
  <!--<router-link to="/logout">Se déconnecter</router-link>-->
  <font-awesome-icon icon="fa-solid fa-right-from-bracket" /> |
  <font-awesome-icon icon="fa-solid fa-user-police-tie" />
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
  color: #4E5166;
}

nav a.router-link-exact-active {
  color: #FD2D01;
}

.previousPost {
  margin: 1.5em;
}

</style>