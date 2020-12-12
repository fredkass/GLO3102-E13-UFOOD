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
          <input-field
            label="Email"
            type="email"
            :maxlength="100"
            :minChars="4"
            icon="envelope"
            v-model="formData.email"
            @isValid="updateIsValidEmail"
            :validationMethod="validateEmail"
          ></input-field>
          
          <input-field
            label="Username"
            type="username"
            :maxlength="30"
            :minChars="4"
            icon="user"
            v-model="formData.name"
            @isValid="updateIsValidUserName"
          ></input-field>


          <input-field
            label="Password"
            type="Password"
            :maxlength="30"
            :minChars="4"
            icon="key"
            v-model="formData.password"
            @isValid="updateIsValidPassword"
          ></input-field>

          
          <input-field
            label="Confirm Password"
            type="Password"
            :maxlength="30"
            :minChars="4"
            v-model="formData.passwordConfirmation"
            @isValid="updateIsValidPasswordConfirmation"
            :validationMethod="validateConfirmation"
          ></input-field>

          <b-button type="is-primary" expanded @click="validateAndSubmit()"
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
        this.isPasswordValid &&
        this.validateConfirmation()
      ) {
        this.submit(this.formData);
      }
    },
    validateEmail() {
      const { email } = this.formData;
      const regexEmail = /\S+@\S+\.\S+/;
      return regexEmail.test(email);
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
    validateConfirmation() {
      // const { password, passwordConfirmation } = this.formData;
      // const isSamePassword = passwordConfirmation === password;
      // if (isSamePassword && this.isPasswordValid == 1) {
      //   this.isConfirmationValid = 1;
      // } else {
      //   this.isConfirmationValid = -1;
      // }
      const { password, passwordConfirmation } = this.formData;
      const isSamePassword = passwordConfirmation === password;
      return isSamePassword;
    },
    updateIsValidPassword(isValid) {
      this.isPasswordValid = isValid;
    },
    updateIsValidEmail(isValid) {
      this.isEmailValid = isValid;
    },
    updateIsValidUserName(isValid) {
      this.isNameValid = isValid;
    },
    updateIsValidPasswordConfirmation(isValid) {
      this.isConfirmationValid = isValid;
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
