<template>
    <div>
        <img alt="Logo Groupomania Rouge" src="../../../Icones/icon-left-font.webp">
        <div>
            <h2>Identifiez-vous</h2>
            <form>
                <label for="email">Email</label><br>
                <input type="email" id="email" name="email" placeholder="john@doe.com"><br>
                <label for="password">Mot de passe</label><br>
                <input type="password" id="password" name="password">
                <input type="submit" value="Valider">
            </form>

            <p>Mot de passe oublié</p>
            <!-- Ajouter une bulle : fonctionnalité à venir -->
            <p>Pas encore de compte, inscrivez-vous <a href="signup">ici</a></p>
            <!-- Gérer le renvoi de page sur la page de signup -->
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import login from '@/components/Login.vue'

export default {
    name: 'Login',
    components: {
        login
    }
}
</script>
