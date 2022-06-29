<template>
    <label for="service">Service</label><br>
    <label for="value.content" v-bind:value="value.content" v-for="value in values" :key="value.id"></label><br>
    <input type="text" v-bind:value="value.content" v-for="value in values" :key="value.id">

</template>

<script>

export default {
    data() {
        return {
            values:
                [
                    { id: 0, content: "FirstName" },
                    { id: 1, content: "LastName" }
                ]
        }
    }
}
</script>

<style scoped>
</style>