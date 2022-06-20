<template>
    <div>
        <div>
            <img alt="Logo Groupomania Rouge" src="../../../Icones/icon-left-font.webp">
            <div>
                <h2>Bonjour</h2>
                <form>
                    <label for="firstName">Prénom</label><br>
                    <input type="text" id="firstName" name="firstName" placeholder="John">
                    <input type="submit" value="Valider"><br>
                    <label for="lastName">Nom</label><br>
                    <input type="text" id="lastName" name="lastName" placeholder="Doe">
                    <input type="submit" value="Valider"><br>
                    <label for="service">Service</label><br>
                    <input type="radio" id="fruit" name="service" value="Fruit">
                    <label for="fruit">Fruit</label><br>
                    <input type="radio" id="legume" name="service" value="Légume">
                    <label for="legume">Légume</label><br>
                    <input type="radio" id="proteine" name="service" value="Proteine">
                    <label for="proteine">Protéine</label><br>
                    <input type="radio" id="boisson" name="service" value="Boisson">
                    <label for="boisson">Boisson</label><br>
                    <input type="radio" id="sucre" name="service" value="Sucre">
                    <label for="sucre">Sucre</label><br>
                    <input type="radio" id="feculent" name="service" value="Feculent">
                    <label for="feculent">Féculent</label><br>
                    <input type="radio" id="laitage" name="service" value="Laitage">
                    <label for="laitage">Laitage</label><br>
                    <input type="submit" value="Valider"><br>
                    <img alt="Avatar" src="../../../backend/images/AvatarParDefaut.jpg"><br>
                    <button type="button">Changer ma photo de profil</button>

                </form>
                <form>
                    <label for="passwordText">Changer mon Mot de passe</label><br>
                    <input type="text" id="passwordText" name="passwordText"><br>
                    <!-- Validation ? -->
                    <label for="password">Confirmer mon nouveau Mot de passe</label><br>
                    <input type="password" id="password" name="password"><br>
                    <input type="submit" value="Valider"><br>
                </form>
                <ul>Mot de passe demandé :
                    <li>Une MAJUSCULE - ABC</li>
                    <li>Une minuscule - abc</li>
                    <li>Un chiffre - 123</li>
                    <li>Un caractère spécial hors &lt;, >, / ou $</li>
                </ul>
                <button type="button"
                    onclick="alert('Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est irréversible')">Supprimer
                    mon compte</button>
                <button type="button">Retourner au fil d'actualité</button>
            </div>
            <!--
                Bonjour + nom de la personne si déjà rempli
            -->
            <!--
                Button => delete user dans BDD + tous les posts et commentaires en BDD
            -->
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import profil from '@/components/Profil.vue'

export default {
  name: 'Profil',
  components: {
    profil
  }
}
</script>

<style scoped>

</style>