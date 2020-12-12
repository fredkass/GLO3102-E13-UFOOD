<template>
  <span class="btn-modale" v-if="!isComponentModalReadonly">
    <button class="button" :class="color" @click="openModal(restaurantId)">
      Mark as visited
    </button>
    <visit-modal
      :isComponentModalActive="isComponentModalActive"
      :restaurantId="restaurantId"
      :user="user"
      :close="closeModal"
    />
  </span>
  <span class="btn-modale" v-else>
    <button class="button" :class="color" @click="openModal(restaurantId)">
      Open visit info
    </button>
    <visit-modal
      :isComponentModalActive="isComponentModalActive"
      :isComponentModalReadonly="isComponentModalReadonly"
      :restaurantId="restaurantId"
      :user="user"
      :close="closeModal"
      :visits="visits"
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
  props: ["restaurantId", "user", "color", "provenance", "visits"],
  data() {
    return {
      isComponentModalActive: false,
      isComponentModalReadonly: this.visits != undefined,
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
