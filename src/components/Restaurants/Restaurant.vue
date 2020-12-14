<template>
  <div class="restaurant" v-if="isRestaurantsLoaded">
    <restaurant-content :restaurant="restaurant">
      <component
        :is="dropdownComponent"
        :favoriteLists="favorites.items"
        :addToListEvent="addRestaurantToList"
      >
      </component>
    </restaurant-content>
  </div>
</template>
<script>
import RestaurantService from "@/services/RestaurantService.js";
import UserService from "@/services/UsersService.js";
import FavoriteRestaurantsService from "@/services/FavoriteRestaurantsService.js";
import RestaurantContent from "./RestaurantContent.vue";
import DropdownFavorites from "../Users/DropdownFavorites.vue";

export default {
  name: "restaurant",
  components: {
    RestaurantContent,
    DropdownFavorites
  },
  async beforeMount() {
    this.restaurant = await this.getRestaurant(this.$route.params.id);
    this.favorites = await this.getUserFavorites();
    this.isRestaurantsLoaded = true;
  },
  data() {
    return {
      apiRestaurant: new RestaurantService(this.$root.user.token),
      apiUser: new UserService(this.$root.user.token),
      apiFavorites: new FavoriteRestaurantsService(this.$root.user.token),
      isRestaurantsLoaded: false,
      userId: this.$root.user.id,
      restaurant: undefined,
      favorites: undefined,
      dropdownComponent: "DropdownFavorites"
    };
  },
  methods: {
    async getRestaurant(id) {
      this.isRestaurantsLoaded = false;
      const restaurants = await this.apiRestaurant.getRestaurant(id);
      return restaurants;
    },
    async getUserFavorites() {
      const favorites = await this.apiUser.getFavoritesListsByUserId(
        this.userId
      );
      return favorites;
    },
    async addRestaurantToList(listId) {
      let response = await this.apiFavorites.addRestaurantToList(listId, this.restaurant.id);

      if (response instanceof Error) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Error adding restaurant to favorites`,
          position: "is-top",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `${this.restaurant.name} added to ${response.name}`,
          position: "is-bottom",
          type: "is-success"
        });
      }
    }
  }
};
</script>
<style></style>
