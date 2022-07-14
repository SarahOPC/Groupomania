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
import AreaForText from '@/components/AreaForText.vue'
import PostComponent from '@/components/PostComponent.vue'

export default {
    name: 'main-news-feed-view',
    components: {
    Logo,
    AreaForText,
    PostComponent
    }
}


</script>

<style scoped>

</style>