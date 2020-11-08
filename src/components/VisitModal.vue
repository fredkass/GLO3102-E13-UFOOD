<template>
  <section>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      :on-cancel="close"
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
  props: ["isComponentModalActive", "restaurantId", "userId"],
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
    close(){
      this.$emit("close");
    },
    async submit(formProps) {
      let response = await this.apiVisits.createRestaurantVisit(
        this.restaurantId,
        formProps.message,
        formProps.rating,
        formProps.date
      );
      this.formProps.message = "";
      this.formProps.date = new Date();
      this.formProps.rating = 0;
      
      if (!response) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Error posting information, please try again`,
          position: "is-top",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Visit posted successfully`,
          position: "is-bottom",
          type: "is-success"
        });
        this.close();
      }
    }
  }
};
</script>
