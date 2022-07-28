<template>
  <div class="byebye">
    <h2>Êtes vous sur de vouloir vous déconnecter</h2>
    <InputSubmit v-on:click="clearSessionStorage()" content="Oui" />
    <InputSubmit v-on:click="returnToNews()" content="Non" />

    <div v-if="hidden == false">
        <h1>A bientôt</h1>
        <h3>Retourner à la page de connexion <span v-on:click="redirect()">ici</span></h3>
    </div>
  </div>
</template>

<script>
import InputSubmit from '@/components/InputSubmit.vue'

export default {
    name: "logout-view",
    components: {
        InputSubmit
    },
    data() {
        return {
            hidden: true
        };
    },
    methods: {
        redirect() {
            return this.$router.push("/");
        },
        clearSessionStorage() {
            sessionStorage.clear();
            this.hidden = false;
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

span {
    cursor: pointer;
}

</style>