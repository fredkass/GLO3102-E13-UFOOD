import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import User from "@/components/User";
import SignUp from "@/components/SignUp/SignUp";
import Login from "@/components/Login/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/restaurant/:id",
      name: "Restaurant",
      component: Restaurant,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/user",
      name: "User",
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/SignUp",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ],
  methods: {
    logOut() {
      this.$emit("logOut");
    }
  }
});

