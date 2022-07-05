<template>
    <div>
        <div>
            <Logo />
            <div>
                <h2>Bonjour</h2>
                <div class="name">
                    <TextInput />
                </div>
                <div class="service">
                    <RadioButton />
                    <InputSubmit content="Valider" />
                </div>
                <div class="avatar">
                    <DefaultAvatar /><br>
                    <InputSubmit content="Changer ma photo de profil" />
                </div>
                <div class="changePassword">
                    <label for="newPassword">Nouveau mot de passe</label><br>
                    <input type="text" id="newPassword" name="newPassword" placeholder="Nouveau mot de passe"><br>
                    <label for="password">Confirmation du nouveau mot de passe</label><br>
                    <input type="password" id="password" name="password" placeholder="Nouveau mot de passe"><br>
                    <InputSubmit content="Valider" />
                </div>
                <div class="changeview">
                <InputSubmit content="Supprimer mon compte" onclick="alert('Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est irréversible')" />
                <InputSubmit content="Retourner au fil d'actualité" />
                </div>
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
import TextInput from '@/components/TextInput.vue'
import RadioButton from '@/components/RadioButton.vue'
import DefaultAvatar from '@/components/DefaultAvatar.vue'

export default {
    name: 'profil-view',
    components: {
    Logo,
    InputSubmit,
    TextInput,
    RadioButton,
    DefaultAvatar
    }
}
</script>

<style scoped>

</style>