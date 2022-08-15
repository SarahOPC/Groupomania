<template>
<div class="modal-overlay">
    <div class="modal">
        <div>{{ content }}</div>

        <div>Êtes-vous certain de vouloir supprimer votre compte. Attention, cette action est DEFINITIVE et IRREVERSIBLE</div>
      <InputSubmit @click="$emit('close-modal')" content="Fermer" />
    </div>
  </div>
</template>

<script>
import InputSubmit from "@/components/InputSubmit.vue";

export default {
  components: {
    InputSubmit
  },
  props: ["content"]
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #00000099;
}

.modal {
  text-align: center;
  background-color: #FFD7D7;
  height: fit-content;
  width: 32em;
  margin-top: 10%;
  padding: 1em;
  border-radius: 1em;
}

@media (max-width: 600px) {
    .modal {
      width: 19em;
      margin-right: 1em;
    }
}


</style>