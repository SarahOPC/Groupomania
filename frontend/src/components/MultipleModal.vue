<template>
  <div class="modal-overlay">
      <div class="modalContent">
          {{ content }}<br>
        <InputSubmit v-if="isQuestion === 'false'" @click="$emit('close-modal-moderator')" content="Fermer" />
        <InputSubmit v-if="isQuestion === 'true'" @click="$emit('deleteProfil')" content="Oui, je supprime définitivement mon compte" /><br>
        <InputSubmit v-if="isQuestion === 'true'" @click="$emit('close-modal-delete')" content="Non, je ne veux pas supprimer mon compte" />
      </div>
  </div>
</template>

<script>
import InputSubmit from "@/components/InputSubmit.vue";

export default {
  components: {
    InputSubmit
  },
  props: ["content", "isQuestion"]
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

.modalContent {
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