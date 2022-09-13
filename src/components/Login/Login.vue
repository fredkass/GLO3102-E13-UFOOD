<template>
  <div class="section">
    <login-form :submit="login" :error="errorMessage"></login-form>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService.js";
import LoginForm from "./LoginForm.vue";
export default {
  name: "Login",
  components: {
    LoginForm
  },
  data: () => {
    return {
      apiUser: new UsersService(),
      errorMessage : "",
    };
  },
  methods: {
    async login(formData) {
      const { email, password } = formData;
      const body = { email, password };
      const user = await this.apiUser.logIn(body);

      if (!(user instanceof Error)) {
        this.$root.user = user;
        this.$root.authenticated = true;
        this.$router.push("/");
      } else {
        this.errorMessage = "Invalid credentials"
      }
    }
  }
};
</script>

<style scoped></style>
