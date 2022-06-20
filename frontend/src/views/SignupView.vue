<template>
  <div>
    <img alt="Logo Groupomania Rouge" src="../../../Icones/icon-left-font.webp">
    <div>
      <h2>Inscrivez-vous dès maintenant</h2>
      <form>
        <label for="email">Email</label><br>
        <input type="email" id="email" name="email" placeholder="john@doe.com"><br>
        <label for="password">Mot de passe</label><br>
        <input type="password" id="password" name="password">
        <input type="submit" value="Valider">
      </form>

      <ul>Mot de passe demandé :
        <li>Une MAJUSCULE - ABC</li>
        <li>Une minuscule - abc</li>
        <li>Un chiffre - 123</li>
        <li>Un caractère spécial hors &lt;, >, / ou $</li>
      </ul>
      <p>Déjà inscrit, identifiez-vous <a href="login">ici</a></p>
      <!-- Gérer le renvoi de page sur la page de login -->

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import signup from '@/components/Signup.vue'

export default {
  name: 'Signup',
  components: {
    signup
  }
}
</script>

<style scoped>
</style>