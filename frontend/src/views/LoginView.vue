<template>
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

                <p>Pas encore inscrit, inscrivez-vous <a href="login">ici</a></p>
                <!-- Gérer le renvoi de page sur la page de login -->

            </div>
        </div>
    </template>
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
