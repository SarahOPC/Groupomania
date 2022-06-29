<template>
    <label for="service">Service</label><br>
    <label for="value.content" v-bind:value="value.content" v-for="value in values" :key="value.id"></label><br>
    <input type="radio" v-bind:value="value.content" v-for="value in values" :key="value.id">
</template>

<script>
export default {
    data() {
        return {
            values:
                [
                    { id: 0, content: "Fruit" },
                    { id: 1, content: "Legume" },
                    { id: 2, content: "Proteine" },
                    { id: 3, content: "Boisson" },
                    { id: 4, content: "Sucre" },
                    { id: 5, content: "Feculent" },
                    { id: 6, content: "Laitage" }
                ]
        }
    }
}
</script>

<style scoped>
</style>