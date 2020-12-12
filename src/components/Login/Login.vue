<template>
  <div class="section">
    <login-form :submit="login"></login-form>
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
      apiUser: new UsersService()
    };
  },
  methods: {
    async login(formData) {
      console.log(formData);
      const { email, password } = formData;
      const body = { email, password };
      const user = await this.apiUser.logIn(body);

      if (!(user instanceof Error)) {
        this.$root.user = user;
        this.$root.authenticated = true;
        this.$router.push("/");
      } else {
        //console.log(user);
      }
    }
  }
};
</script>

<style scoped></style>
