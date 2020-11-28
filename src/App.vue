<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
export default {
  name: "app",
  components: {
    "nav-menu": Navigation
  },
  data() {
    return {
      authenticated: false,
      user: {
        email: "",
        password: "",
        token: "",
        id: ""
      }
    };
  },
  methods: {
    //TODO watch event logout pour le bouton logout dans le milieu de user, puis passer toggleLogIn à la navbar
  }
};
</script>
<style lang="scss">
@import "assets/appstyles.scss";
</style>
