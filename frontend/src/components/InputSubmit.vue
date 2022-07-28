<template>

  <button>{{ content }}</button>

</template>

<script>
export default {
  props: ["content"]
}
</script>

<style scoped>
button {
  background-color: #4E5166;
  border-radius: 0.5em;
  color: #FFD7D7;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-right: 1em;
}

button:hover {
  color: #4E5166;
  background-color: #FFD7D7;
  border-color: #FD2D01;
}
</style>