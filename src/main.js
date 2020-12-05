import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import * as GmapVue from "gmap-vue";
import Buefy from "buefy";
import StarRating from "vue-star-rating";

var VueCookie = require("vue-cookies");

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("star-rating", StarRating);
Vue.use(Buefy, {
  defaultIconComponent: "font-awesome-icon",
  defaultIconPack: "fas"
});
Vue.use(GmapVue, {
  load: {
    key: "AIzaSyAKp8Sa9fa7-OXt9LJvd61Sc2zO6uz22Xs",
    libraries: "directions"
  }
});
Vue.use(VueCookie);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    to.path !== "/login"
  ) {
    if (!Vue.$cookies.get("token")) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
new Vue({
  render: h => h(App),
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
    isAuthenticated(){
      return this.authenticated;
    }
  },
  router
}).$mount("#app");
