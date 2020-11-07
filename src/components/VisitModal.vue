<template>
  <section>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <visit-form
        :close="close"
        :submit="submit"
        :formProps="formProps"
      ></visit-form>
    </b-modal>
  </section>
</template>

<script>
import VisitForm from "./VisitForm.vue";
import RestaurantVisitsService from "../services/RestaurantVisitsService.js";

export default {
  name: "VisitModal",
  components: {
    VisitForm
  },
  props: ["isComponentModalActive", "restaurantId", "userId", "close"],
  data() {
    return {
      apiVisits: new RestaurantVisitsService(this.userId),
      formProps: {
        message: "",
        date: new Date(),
        rating: 0
      }
    };
  },
  methods: {
    async submit(formProps) {
      await this.apiVisits.createRestaurantVisit(
        this.restaurantId,
        formProps.message,
        formProps.rating,
        formProps.date
      );
      this.formProps.message = "";
      this.formProps.date = new Date();
      this.formProps.rating = 0;

      this.close();
    }
  }
};
</script>
