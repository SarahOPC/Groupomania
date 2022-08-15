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
  margin: 0.5em;
}

button:hover {
  color: #4E5166;
  background-color: #FFD7D7;
  border-color: #FD2D01;
}
</style>