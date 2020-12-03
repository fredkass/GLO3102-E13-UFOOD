<template>
  <div class="section">
    <div class="LoginForm">
      <div class="columns">
        <div class="column"></div>
        <div class="column is-one-third is-two-thirds-tablet">
          <figure class="image is-96x96 container">
            <img
              class="logoNav"
              src="../../img/ufood-logo-no-text.png"
              alt="logo-no-text"
            />
          </figure>
          <h1 class="title is-1">
            Log in
          </h1>
          <input-field
            label="Email"
            type="email"
            icon="envelope"
            v-model="formData.email"
            :hasValidation="false"
          ></input-field>


          <input-field
            label="Password"
            type="Password"
            icon="key"
            v-model="formData.password"
            :hasValidation="false"
          ></input-field>

          <b-button type="is-primary" expanded @click="submit(formData)"
            >Submit</b-button
          >
        </div>

        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "../Fields/InputField.vue";

export default {
  components: {
    InputField
  },
  name: "LoginForm",
  props: ["submit"],
  data: () => {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
  }
};
</script>

<style scoped></style>
