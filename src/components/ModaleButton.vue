<template>
  <div class="btn-modale">
    <visit-modal
      :isComponentModalActive="isComponentModalActive"
      :restaurantId="restaurantId"
      :userId="userId"
      :close="closeModal"
    />
    <button class="button" :class="color" @click="openModal(restaurantId)">
      Mark as visited
    </button>
  </div>
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
