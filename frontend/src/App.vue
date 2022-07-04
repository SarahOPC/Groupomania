<template>
  <nav>
    <router-link to="/">Se connecter</router-link> |
    <router-link to="/profil">Voir mon profil</router-link> |
    <router-link to="/news">Voir le fil d'actualité</router-link> | 
    <!--<router-link to="/logout">Se déconnecter</router-link>-->
  </nav>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4E5166;

}

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
