<template>
    <input type="submit" v-bind:value="value.content" v-for="value in values" :key="value.id">
</template>

<script>
export default {
    data() {
        return {
            values:
            [
                { id: 0, content: "valider" },
                { id: 1, content: "modifier" },
                { id: 2, content: "supprimer" }
            ]

        }
    }
}
</script>

<style scoped>
</style>