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
        <b-pagination
          :total="totalVisits"
          per-page="1"
          v-model="currentVisit"
          @change="loadVisitInfo"
        >
        </b-pagination>
        <visit :close="close" :visitInfo="visitInfo"></visit>
      </b-modal>
    </div>
  </section>
</template>

<script>
import VisitForm from "./VisitForm.vue";
import Visit from "./Visit.vue";
import RestaurantVisitsService from "../../services/RestaurantVisitsService.js";

export default {
  name: "VisitModal",
  created() {
    if (this.isComponentModalReadonly) {
      this.totalVisits = this.visits.length;
      this.currentVisit = 1;
      this.loadVisitInfo();
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
    "user",
    "close",
    "visits"
  ],
  data() {
    return {
      apiVisits: new RestaurantVisitsService(this.user.id, this.user.token),
      visitInfo: {},
      totalVisits: 1,
      currentVisit: 1,

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
    loadVisitInfo() {
      this.visitInfo = this.visits[this.currentVisit - 1];
    }
  }
};
</script>
