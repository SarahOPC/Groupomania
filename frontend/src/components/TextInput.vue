<template>
    <label :for="modelTitle">{{ title }}</label><br>
    <input type="text" :id="modelId" :value="modelValue" :placeholder="modelPlaceholder">
</template>

<script>
export default {
    props: {
        modelTitle: String,
        modelValue: String,
        modelId: String,
        modelPlaceholder: String
    }
}
</script>

<style scoped>
</style>