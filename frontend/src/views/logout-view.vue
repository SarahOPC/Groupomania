<template>
    <div class="byebye">
        <h2>Êtes vous sur de vouloir vous déconnecter</h2>
        <InputSubmit @click="clearSessionStorage()" content="Oui" />
        <InputSubmit @click="returnToNews()" content="Non" />
    </div>
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'

export default {
    name: "logout-view",
    components: {
        InputSubmit
    },
    methods: {
        clearSessionStorage() {
            sessionStorage.clear();
            return this.$router.push("/");        
        },
        returnToNews() {
            return this.$router.push("/news");
        }
    }
}

</script>

<style scoped>
.byebye {
    color: #FFD7D7;
    font-weight: bold;
}

@media only screen and (min-width: 600px) and (max-width: 1150px) and (orientation: landscape) {
    .byebye {
        font-size: x-large;
    }
}

</style>