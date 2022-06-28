<template>
    <label>{{ title }}</label><br>
    <input type="text" :value="modelValue" :placeholder="label" @input="$emit('update: modelValue', $event.target.value)">

</template>

<script>

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
</style>