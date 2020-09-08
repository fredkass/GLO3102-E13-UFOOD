import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import StarRating from 'vue-star-rating'

Vue.component('star-rating', StarRating)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
