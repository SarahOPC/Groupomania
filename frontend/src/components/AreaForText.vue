<template>
    <textarea v-model="text" name="newPostFromUser" rows="7" cols="50"></textarea><br>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
</style>