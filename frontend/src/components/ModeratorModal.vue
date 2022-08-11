<template>
<div class="modal-overlay">
    <div class="moderatorModal">
        <p>Le rôle du modérateur sur ce site est de permettre et de faciliter les échanges courtois entre collègues.</p>
        <p>Ce site a pour seul but de vous donner la possibilité de discuter de tout entre vous, que cela concerne le travail ou pas.</p>
        <p>Le modérateur se réserve le droit de modifier ou supprimer selon son propre avis tout post ou commentaire considéré comme ne respectant pas l'esprit de notre entreprise</p>
        <p>Merci de votre compréhension et de votre collaboration pour garder cet espace de détente sain et agréable</p>
      <InputSubmit @click="$emit('close-modal')" content="Fermer" />
    </div>
  </div>
</template>

<script>
import InputSubmit from "@/components/InputSubmit.vue";

export default {
  components: {
    InputSubmit
  }
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

.moderatorModal {
  text-align: center;
  background-color: #FFD7D7;
  height: fit-content;
  width: 32em;
  margin-top: 10%;
  padding: 1em;
  border-radius: 1em;
}

p {
  margin: 1em;
}

@media (max-width: 600px) {
    .moderatorModal {
      width: 19em;
      margin-right: 1em;
    }
}


</style>