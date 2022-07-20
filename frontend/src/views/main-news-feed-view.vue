<template>
<nav>
  | <router-link to="/profil">Voir mon profil</router-link> | 
  <!--<router-link to="/logout">Se déconnecter</router-link>--> |
</nav>
  <router-view></router-view>
    <div>
        <div>
            <form>
                <AreaForText />
            </form>
        </div>
        
        <div>
            <div class="previousPost">
                <PostComponent />
            </div><br>
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>