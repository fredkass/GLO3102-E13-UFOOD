<template>
  <!--TODO FILLER FORM PLACEHOLDER-->
  <div class="section">
    <sign-up-form :submit="validateAndSignup"></sign-up-form>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService.js";
import SignUpForm from "./SignUpForm.vue";
export default {
  name: "SignUp",
  components: {
    SignUpForm
  },
  data: () => {
    return {
      apiUser: new UsersService()
    };
  },
  methods: {
    async validateAndSignup(formData) {
      await this.signUp(formData);
    },

    async signUp(formData) {
      const { email, name, password } = formData;
      const body = { email, name, password };
      await this.apiUser.signUp(body);
    }
  }
};
</script>

<style scoped></style>
