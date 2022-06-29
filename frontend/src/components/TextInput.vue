<template>
    <div class="nameForm" v-bind:value="content">
        <label for="content" v-bind:value="content">{{ content }}</label><br>
        <input type="text" v-bind:placeholder="content">
    </div>

</template>

<script>

export default {
    props: ["content"]
}
</script>

<style scoped>
</style>