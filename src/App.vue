<template>
  <div id="app">
    <nav-menu v-if="this.$root.user" :user="this.$root.user" :logout="logout"></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import UsersService from "./services/UsersService.js";
import Navigation from "@/components/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation
  },
  data() {
    return {
      userApi: new UsersService()
    };
  },
  methods: {
    async logout() {
      const response = await this.userApi.logOut();
      if(response){
        this.$root.user = null;
        this.$root.authenticated = false;
        this.$cookies.remove("token");
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style lang="scss">
@import "assets/appstyles.scss";
</style>
