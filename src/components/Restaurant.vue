<template>
  <div class="restaurant" v-if="isRestaurantsLoaded">
    <restaurant-content :restaurant="restaurant" />
  </div>
</template>
<script>
import RestaurantService from "@/services/RestaurantService.js";
import RestaurantContent from "./RestaurantContent.vue";

export default {
  name: "restaurant",
  components: {
    RestaurantContent
  },
  async beforeMount() {
    this.restaurant = await this.getRestaurant(this.$route.params.id);
    this.isRestaurantsLoaded = true;
  },
  data() {
    return {
      apiRestaurant: new RestaurantService(),
      isRestaurantsLoaded: false,
      restaurant: undefined
    };
  },
  methods: {
    async getRestaurant(id) {
      this.isRestaurantsLoaded = false;
      const restaurants = await this.apiRestaurant.getRestaurant(id);
      return restaurants;
    }
  }
};
</script>
<style></style>
