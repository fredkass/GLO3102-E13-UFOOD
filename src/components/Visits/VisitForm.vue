<template>
  <div class="visit-form">
    <form action="">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Visit information</p>
          <button type="button" class="delete" @click="close" />
        </header>
        <section class="modal-card-body">
          <b-field label="Select a rating">
            <star-rating
              :star-size="20"
              :show-rating="true"
              v-model="formProps.rating"
            ></star-rating>
          </b-field>
          <b-field label="Select a date">
            <b-datepicker
              v-model="formProps.date"
              locale="en-CA"
              placeholder="Click to select..."
              icon="calendar"
              trap-focus
              append-to-body
              :max-date="today"
            >
            </b-datepicker>
          </b-field>

          <b-field label="Message">
            <b-input
              minlength="1"
              maxlength="500"
              type="textarea"
              v-model="formProps.message"
              required
              validation-message="Message is mandatory"
              ref="message"
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="close">
            Close
          </button>
          <button class="button is-primary" @click="validateAndSubmit">
            Save
          </button>
        </footer>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "VisitForm",
  props: ["submit", "close", "formProps"],
  data() {
    return {
      today: new Date()
    };
  },
  methods: {
    validateAndSubmit() {
      if (this.$refs.message.checkHtml5Validity()) {
        this.submit(this.formProps);
      }
    }
  }
};
</script>
