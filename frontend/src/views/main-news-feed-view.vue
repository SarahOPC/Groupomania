<template>
    <div>
        <Logo />
        <div>
            <h3>Quelque chose à partager</h3>
            <form>
                <AreaForText />
                <InputSubmit /><br>
                <InputSubmit /><br>
                <InputSubmit /><br>
            </form>
            <button type="button">Ajouter une image (.jpg ou .png)</button>
        </div>
        <div>
            <div class="previousPost"></div><br>
            <input type="text" id="comment" name="comment" placeholder="Mon commentaire"><br>
            <input type="submit" value="J'aime">
            <input type="submit" value="Je n'aime pas"><br>
            <InputSubmit />
            <input type="submit" value="Modifer"><br>
            <input type="submit" value="Supprimer"><br>
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

export default {
    name: 'main-news-feed-view',
    components: {
        Logo,
        InputSubmit,
        AreaForText
    }
}


</script>

<style scoped>

</style>