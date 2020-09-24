import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Buefy from "buefy";
import StarRating from "vue-star-rating";

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("star-rating", StarRating);
Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: "fas"
});
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
