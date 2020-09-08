import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import StarRating from 'vue-star-rating'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('star-rating', StarRating)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
