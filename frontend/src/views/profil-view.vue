<template>
    <div>
        <div>
            <Logo />
            <div>
                <h2>Bonjour</h2>
                <form>
                    
                    <InputSubmit />
                    <label for="lastName">Nom</label><br>
                    <input type="text" id="lastName" name="lastName" placeholder="Doe">
                    <InputSubmit />
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
                    <InputSubmit />
                    <img alt="Avatar" src="../../../backend/images/AvatarParDefaut.jpg"><br>
                    <button type="button">Changer ma photo de profil</button>

                </form>
                <form>
                    <label for="passwordText">Changer mon Mot de passe</label><br>
                    <input type="text" id="passwordText" name="passwordText"><br>
                    <!-- Validation ? -->
                    <label for="password">Confirmer mon nouveau Mot de passe</label><br>
                    <input type="password" id="password" name="password"><br>
                    <InputSubmit />
                </form>
                <FalseRegex />
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
import Logo from '@/components/logo-component.vue'
import InputSubmit from '@/components/InputSubmit.vue'
import FalseRegex from '@/components/FalseRegex.vue'

export default {
    name: 'profil-view',
    components: {
    Logo,
    InputSubmit,
    FalseRegex
    },
    data () => {
        return {
            // label for,
            // title,
            // id,
            // name,
            // placeholder
        }
    }
}
</script>

<style scoped>

</style>