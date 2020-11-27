<template>
  <div class="section">
    <div class="SignUpForm">
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
            Sign up for free !
          </h1>
          <b-field label="Email" :type="getInputType(isEmailValid)">
            <b-input
              type="email"
              placeholder="Email"
              icon="envelope"
              v-model="formData.email"
              @input="validateEmail()"
            ></b-input>
          </b-field>

          <b-field
            label="Username"
            :message="messages.name"
            :type="getInputType(isNameValid)"
          >
            <b-input
              placeholder="Username"
              icon="user"
              maxlength="30"
              v-model="formData.name"
              @input="validateName()"
            ></b-input>
          </b-field>

          <b-field
            label="Password"
            :message="messages.password"
            :type="getInputType(isPasswordValid)"
          >
            <b-input
              placeholder="Password"
              icon="key"
              type="password"
              maxlength="30"
              v-model="formData.password"
              @input="validatePassword()"
            ></b-input>
          </b-field>

          <b-field
            label="Confirm Password"
            :type="getInputType(isConfirmationValid)"
          >
            <b-input
              placeholder="Password"
              icon="key"
              type="password"
              maxlength="30"
              v-model="formData.passwordConfirmation"
              @input="validateConfirmation()"
            ></b-input>
          </b-field>

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
export default {
  name: "SignUpForm",
  props: ["submit"],
  data: () => {
    return {
      minimumChars: {
        password: 4,
        name: 4
      },
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      messages: {
        password: [],
        email: [],
        name: []
      },
      isEmailValid: 0,
      isNameValid: 0,
      isPasswordValid: 0,
      isConfirmationValid: 0
    };
  },
  methods: {
    validateAndSubmit() {
      if (
        this.isEmailValid == 1 &&
        this.isNameValid == 1 &&
        this.isPasswordValid == 1
      ) {
        this.submit(this.formData);
      }
    },
    validateEmail() {
      const { email } = this.formData;
      const regexEmail = /\S+@\S+\.\S+/;
      if (regexEmail.test(email)) {
        this.isEmailValid = 1;
      } else {
        this.isEmailValid = -1;
      }
    },
    validateName() {
      const { name } = this.formData;
      this.isNameValid = this.validateLength(name, this.minimumChars.name);
      if (this.isNameValid == -1) {
        this.messages.name = ["Username is too short"];
      } else {
        this.messages.name = [];
      }
    },
    validatePassword() {
      const { password } = this.formData;
      this.isPasswordValid = this.validateLength(
        password,
        this.minimumChars.password
      );
      if (this.isPasswordValid == -1) {
        this.messages.password = ["Password is too short"];
      } else {
        this.messages.password = [];
      }
    },
    validateConfirmation() {
      const { password, passwordConfirmation } = this.formData;
      const isSamePassword = passwordConfirmation === password;
      if (isSamePassword && this.isPasswordValid == 1) {
        this.isConfirmationValid = 1;
      } else {
        this.isConfirmationValid = -1;
      }
    },
    validateLength(input, minChars) {
      if (input.length <= minChars) {
        return -1;
      } else {
        return 1;
      }
    },
    getInputType(isValid) {
      return isValid == 1 ? "is-success" : isValid == -1 ? "is-danger" : "";
    }
  }
};
</script>

<style scoped></style>
