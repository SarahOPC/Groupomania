<template>
    <div class="passwordForm" v-bind:value="content">
        <label for="content" v-bind:value="content">{{ content }}</label><br>
        <input type="password" v-model="password" v-bind:placeholder="content">
    </div>
</template>

<script>
export default {
    props: ["content"]
}
</script>

<style scoped>
</style>