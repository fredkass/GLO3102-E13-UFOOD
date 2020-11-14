<template>
  <div v-if="isHomeDisplay">
    <span class="btn-modale">
      <button class="button" :class="color" @click="openModal(restaurantId)">
        Mark as visited
      </button>
      <visit-modal
        :isComponentModalActive="isComponentModalActive"
        :restaurantId="restaurantId"
        :userId="userId"
        :close="closeModal"
      />
    </span>
  </div>
  <div v-else>
    <span class="btn-modale">
      <button class="button" :class="color" @click="openModal(restaurantId)">
        Open visit info
      </button>
      <visit-modal
        :isComponentModalActive="isComponentModalActive"
        :isComponentModalReadonly="isComponentModalReadonly"
        :restaurantId="restaurantId"
        :userId="userId"
        :close="closeModal"
        :visitId="visitId"
      />
    </span>
  </div>
</template>
<script>
import VisitModal from "./VisitModal.vue";

export default {
  name: "ModaleButton",
  components: {
    VisitModal
  },
  props: ["restaurantId", "userId", "color", "provenance", "visitId"],
  data() {
    return {
      isComponentModalActive: false,
      isComponentModalReadonly: this.provenance == "user",
      isHomeDisplay: this.provenance == "home"
    };
  },
  methods: {
    openModal(id) {
      this.isComponentModalActive = !this.isComponentModalActive;
      this.restaurantModalId = id;
    },
    closeModal() {
      this.isComponentModalActive = false;
    }
  }
};
</script>
