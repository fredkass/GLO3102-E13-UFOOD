<template>
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
</template>
<script>
import VisitModal from "./VisitModal.vue";
export default {
  name: "ModaleButton",
  components: {
    VisitModal
  },
  props: ["restaurantId", "userId", "color"],
  data() {
    return {
      isComponentModalActive: false
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
