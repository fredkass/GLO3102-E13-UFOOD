import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import SignUpForm from "@/components/SignUpForm";

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
      path: "/SignUpForm",
      name: "SignUpForm",
      component: SignUpForm
    }
  ],
  methods: {
    logOut() {this.$emit('logOut');}
  }
});
