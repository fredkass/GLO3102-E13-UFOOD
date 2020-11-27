import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import SignUp from "@/components/SignUp/SignUp";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/restaurant/:id",
      name: "Restaurant",
      component: Restaurant
    },
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: SignUp
    }
  ],
  methods: {
    logOut() {this.$emit('logOut');}
  }
});
