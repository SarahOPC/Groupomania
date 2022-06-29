<template>
    <div>
        <div>
            <Logo />
            <div>
                <h2>Bonjour</h2>
                <form>

                    <InputSubmit />
                    <TextInput />
                    <InputSubmit />
                    <RadioButton />
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
import TextInput from '@/components/TextInput.vue'
import RadioButton from '@/components/RadioButton.vue'

export default {
    name: 'profil-view',
    components: {
        Logo,
        InputSubmit,
        FalseRegex,
        TextInput,
        RadioButton
    }
}
</script>

<style scoped>

</style>