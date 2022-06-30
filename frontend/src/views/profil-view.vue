<template>
    <div>
        <div>
            <Logo />
            <div>
                <h2>Bonjour</h2>
                <form>
                    <TextInput content="FirstName" />
                    <TextInput content="LastName" />
                    <InputSubmit content="Valider" />
                    <RadioButton />
                    <InputSubmit content="Valider" />
                    <DefaultAvatar /><br>
                    <InputSubmit content="Changer ma photo de profil" />

                </form>
                <form>
                    <TextInput content="Quel est mon nouveau mot de passe ?" />
                    <InputSubmit content="Valider" />
                    
                    <InputSubmit content="Valider" />
                </form>
                
                <InputSubmit content="Supprimer mon compte" onclick="alert('Êtes-vous sûr de vouloir supprimer votre compte ? Attention, cette action est irréversible')" />
                <InputSubmit content="Retourner au fil d'actualité" />
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