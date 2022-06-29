<template>
    <div>
        <Logo />
        <div>
            <h3>Quelque chose à partager</h3>
            <form>
                <AreaForText />
                <InputSubmit content="Valider" /><br>
                <InputSubmit content="Modifier" /><br>
                <InputSubmit content="Supprimer" /><br>
            </form>
            <button type="button">Ajouter une image (.jpg ou .png)</button>
        </div>
        <div>
            <div class="previousPost"></div><br>
            <InputSubmit content="J'aime" /><br>
            <InputSubmit content="Je n'aime pas" /><br>
            <TextInput content="Commentaire" /><br>
            <InputSubmit content="Valider" /><br>
            <InputSubmit content="Modifier" /><br>
            <InputSubmit content="Supprimer" /><br>
        </div>
        <!--
            Menu avec Profil et deconnexion
            Précédents posts en ordre antéchronologique
        -->
    </div>
</template>

<script>
// @ is an alias to /src
import Logo from '@/components/logo-component.vue'
import InputSubmit from '@/components/InputSubmit.vue'
import AreaForText from '@/components/AreaForText.vue'
import TextInput from '@/components/TextInput.vue'

export default {
    name: 'main-news-feed-view',
    components: {
    Logo,
    InputSubmit,
    AreaForText,
    TextInput
}
}


</script>

<style scoped>

</style>