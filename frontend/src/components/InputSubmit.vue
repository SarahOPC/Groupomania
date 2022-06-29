<template>
    <input type="submit" v-bind:value="content"><br>
</template>

<script>
export default {
    props: ["content"]
}
</script>

<style scoped>
</style>