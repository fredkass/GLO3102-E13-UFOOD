import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurants/Restaurant";
import User from "@/components/Users/User";
import SignUp from "@/components/SignUp/SignUp";
import Login from "@/components/Login/Login";
import UserGuestView from "@/components/Users/UserGuestView";
import UserView from "@/components/Users/UserView"

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
      path: "/userguestview/:searchTerms",
      name: "UserGuestView",
      component: UserGuestView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/userview/:userId",
      name: "UserView",
      component: UserView,
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

