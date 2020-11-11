import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import * as GmapVue from "gmap-vue";
import Buefy from "buefy";
import StarRating from "vue-star-rating";

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
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
