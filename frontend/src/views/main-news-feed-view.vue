<template>
    <div>
        <Logo />
        <div> 
            <h1>Miamomania</h1>
            <h4>Le réseau social de Groupomania</h4>
            <form>
                <AreaForText />
            </form>
        </div>
        
        <div>
            <div class="previousPost">
                <PostComponent />
            </div><br>
            <InputSubmit content="J'aime" /><br>
            <InputSubmit content="Je n'aime pas" /><br>
            <input type="text" id="comments" name="comments" placeholder="Mon commentaire"><br>
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
import PostComponent from '@/components/PostComponent.vue'

export default {
    name: 'main-news-feed-view',
    components: {
    Logo,
    InputSubmit,
    AreaForText,
    PostComponent
    }
}


</script>

<style scoped>

</style>