<template>
  <section>
    <div class="visit-modal" v-if="!this.isComponentModalReadonly">
      <b-modal
        :active="isComponentModalActive"
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
    </div>
    <div v-else>
      <b-modal
        :active="isComponentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        :on-cancel="close"
        aria-role="dialog"
        aria-modal
      >
        <visit :close="close" :visitInfo="visitInfo"></visit>
      </b-modal>
    </div>
  </section>
</template>

<script>
import VisitForm from "./VisitForm.vue";
import Visit from "./Visit.vue";
import RestaurantVisitsService from "../services/RestaurantVisitsService.js";

export default {
  name: "VisitModal",
  created() {
    if (this.isComponentModalReadonly) {
      this.loadVisitInfo(this.visitId);
    }
  },
  components: {
    VisitForm,
    Visit
  },
  props: [
    "isComponentModalReadonly",
    "isComponentModalActive",
    "restaurantId",
    "userId",
    "close",
    "visitId"
  ],
  data() {
    return {
      apiVisits: new RestaurantVisitsService(this.userId),
      visitInfo: {},
      formProps: {
        message: "",
        date: new Date(),
        rating: 0
      }
    };
  },
  methods: {
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
    },
    loadVisitInfo(id) {
      this.getVisitInfo(id).then(v => (this.visitInfo = v));
    },
    async getVisitInfo(id) {
      const visitInfo = await this.apiVisits.getRestaurantVisit(id);
      return visitInfo;
    }
  }
};
</script>
