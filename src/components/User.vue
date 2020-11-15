<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="box profile-container has-text-centered">
          <figure class="image profile">
            <img
              src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1601273955&Signature=meBVGTd53ut91D6gCOwE8Zwun60NUAlDwAB2Okj2LGm0EoC12iu8B5Tthah-RFR9XPibt-3wI1ruv9ex3~tlAtUAsvXNZz2-AVRJ33L64Qn5qmo~F4YGxsuPvSBagP0hBRhSA7eVzgohLu9gIEbNqw9IFOdgeLgjP3eM3GGLSuWMe152iVyLmIiKUGhPIADJ5AmjM5qoamjXjdPXgJsOONsghDUnn76n3x76b-dLO3PgLMTWdx39IKA9Osiip5CLPA7AqFqfzdzfqruV9Fhu2Ns-kd13N45ItzW-Q8ttLcXg4mVDn7EJ2oQlpxZ6LxfVHJbPofXbHnnb68qeUeUF5g__&Key-Pair-Id=APKAJSDH2OZQQSA64LQQ"
              alt="user icon"
            />
          </figure>
          <h4 class="subtitle is-5">Profile Info</h4>
          <p>
            {{ profile.name }}
          </p>
          <p>Your rating: {{ profile.rating }}</p>
          <b-dropdown aria-role="list">
            <button class="button is-primary" slot="trigger">
              <span>Favorite lists</span>
            </button>
            <b-dropdown-item aria-role="listitem" @click="createNewList()"
              >Create new list
            </b-dropdown-item>
            <b-dropdown-item
              v-for="favList in favorites_lists"
              :key="favList.id"
              aria-role="listitem"
              @click="loadFavoriteListItems(favList.id)"
            >
              {{ favList.name }}
            </b-dropdown-item>
          </b-dropdown>
          <b-button
            class="logout"
            type="is-primary"
            tag="router-link"
            :to="{ path: '/' }"
          >
            Log Out
          </b-button>
        </div>
      </div>
      <div v-if="display_past_visits" class="column is-three-quarters">
        <h1 class="title">Past visits</h1>
        <div
          class="column is-half-desktop is-full-tablet"
          v-if="visited_restaurants.length < 1 && this.isRestaurantsLoaded"
        >
          No Restaurants Visited
        </div>
        <div
          class="column is-half-desktop is-full-tablet"
          v-for="visit in visited_restaurants"
          :key="visit.visitId"
        >
          <restaurant-card
            :restaurant="visit.restaurant"
            :userId="userId"
            :provenance="provenance"
            :visitId="visit.visitId"
            :hideModal="false"
          />
        </div>
      </div>
      <div v-else class="column is-three-quarters">
        <h1 class="title">{{ this.current_favorites_list.name }}</h1>
        <div class="columns is-multiline">
          <div
            class="column is-half-desktop is-full-tablet"
            v-if="current_favorites_list.restaurants.length < 1"
          >
            List currently empty
          </div>
          <div
            class="column is-half-desktop is-full-tablet"
            v-for="restaurant in current_favorites_with_restaurants.restaurants"
            :key="restaurant.index"
          >
            <restaurant-card
              :hideModal="true"
              :restaurant="restaurant"
              :userId="userId"
              :provenance="provenance"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService.js";
import RestaurantVisistsService from "@/services/RestaurantVisitsService.js";
import FavoriteRestaurantsService from "@/services/FavoriteRestaurantsService.js";
import RestaurantService from "@/services/RestaurantService.js";
import RestaurantCard from "./RestaurantCard.vue";

export default {
  created() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      this.getUserById().then(u => {
        this.profile = u;
      });
      this.getRestaurantVisits().then(v => {
        if (v != undefined) {
          this.restaurant_visits = v.items;
        }
        this.loadVisitedRestaurants();
      });
      this.getFavoritesLists().then(l => {
        this.favorites_lists = l.items;
      });
    },
    async getUserById() {
      this.isUserLoaded = false;
      const user = await this.apiUsers.getUserById(this.userId);
      this.isUserLoaded = true;
      return user;
    },
    async getRestaurantVisits() {
      this.isVisitedRestaurantsloaded = false;
      const visitedRestaurants = await this.apiVisits.getAllRestaurantsVisits();
      this.isVisitedRestaurantsloaded = true;
      return visitedRestaurants;
    },
    async getFavoritesLists() {
      this.isFavoritesListsLoaded = false;
      const lists = await this.apiUsers.getFavoritesListsByUserId(this.userId);
      this.isFavoritesListsLoaded = true;
      return lists;
    },
    loadVisitedRestaurants() {
      this.isRestaurantsLoaded = false;
      let restaurantIds = this.restaurant_visits.map(v => v.restaurant_id);
      let visitIds = this.restaurant_visits.map(v => v.id);
      let visited_restaurant = {
        restaurant: {},
        visitId: 0
      };
      for (let i = 0; i < restaurantIds.length; i++) {
        this.getRestaurant(restaurantIds[i]).then(r => {
          visited_restaurant.restaurant = r;
          visited_restaurant.visitId = visitIds[i];
          this.visited_restaurants.push({
            restaurant: visited_restaurant.restaurant,
            visitId: visited_restaurant.visitId
          });
        });
      }
      this.isRestaurantsLoaded = true;
    },
    async getRestaurant(id) {
      const restaurant = await this.apiRestaurants.getRestaurant(id);
      return restaurant;
    },
    loadFavoriteListItems(listId) {
      this.getFavoriteList(listId).then(l => {
        this.current_favorites_list = l;
        this.current_favorites_with_restaurants = l;
        this.display_past_visits = false;
        this.loadFavoriteRestaurants();
      });
    },
    async getFavoriteList(listId) {
      const list = await this.apiFavorites.getFavoriteListById(listId);
      return list;
    },
    loadFavoriteRestaurants() {
      let restaurantIds = this.current_favorites_list.restaurants.map(
        r => r.id
      );
      this.current_favorites_with_restaurants.restaurants = [];
      debugger;
      for (let i = 0; i < restaurantIds.length; i++) {
        this.getRestaurant(restaurantIds[i]).then(r => {
          this.current_favorites_with_restaurants.restaurants.push(r);
        });
      }
    }
  },
  data: () => {
    return {
      userId: "5fa6c9524a1f410004c5114b",
      apiUsers: new UsersService(),
      apiVisits: new RestaurantVisistsService("5fa6c9524a1f410004c5114b"),
      apiFavorites: new FavoriteRestaurantsService(),
      apiRestaurants: new RestaurantService(),
      isUserLoaded: false,
      isVisitedRestaurantsloaded: false,
      isRestaurantsLoaded: false,
      isFavoritesListsLoaded: false,
      profile: {},
      restaurant_visits: [],
      visited_restaurants: [],
      favorites_lists: [],
      current_favorites_list: {},
      current_favorites_with_restaurants: {},
      provenance: "user",
      display_past_visits: true
    };
  },
  components: {
    RestaurantCard
  }
};
</script>

<style scoped>
.image img {
  width: 100%;
  object-fit: cover;
}
.box:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.profile-container p {
  line-height: 2.5em;
}
.profile-container .profile img {
  max-height: 200px;
  max-width: 150px;
  overflow: hidden;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.past-visits {
  margin-left: 10;
}
</style>
