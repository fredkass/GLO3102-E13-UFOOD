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
            <b-dropdown-item
              v-for="favList in favorites_lists"
              :key="favList.id"
              aria-role="listitem"
              @click="loadFavoriteListItems(favList.id)"
            >
              {{ favList.name }}
            </b-dropdown-item>
          </b-dropdown>
          <favorites-manager
            :favoritesLists="favorites_lists"
            :userId="userId"
            :deleteSelectedList="deleteSelectedList"
          ></favorites-manager>
          <b-button type="is-primary" tag="router-link" :to="{ path: '/' }">
            Sign Out</b-button
          >
        </div>
      </div>
      <div v-if="display_past_visits" class="column is-three-quarters">
        <h1 class="title">Past visits</h1>

        <b-pagination
          :total="total_visits"
          v-model="currentPage"
          :per-page="visit_per_page"
          @change="loadVisits"
        >
        </b-pagination>
        <div class="columns is-multiline">
          <div
            class="column is-half-desktop is-full-tablet"
            v-if="visited_restaurants.length < 1 && this.isRestaurantsLoaded"
          >
            No Restaurants Visited
          </div>
          <div
            class="column is-half-desktop is-full-tablet"
            v-for="visit in visited_restaurants"
            :key="visit.restaurant.id"
          >
            <restaurant-card
              :restaurant="visit.restaurant"
              :userId="userId"
              :provenance="provenance"
              :visits="visit.visits"
              :hideModal="false"
              :favoriteLists="favorites_lists"
            />
          </div>
        </div>
      </div>
      <div v-else class="column is-three-quarters">
        <h1 class="title" v-if="!editMode">
          {{ this.current_favorites_list.name }}
          <b-button icon-left="edit" @click="toggleEditMode"></b-button>
        </h1>
 
        <div class="field has-addons" v-if="editMode">
          <div class="control">
            <b-input type="text" v-model="current_favorites_list.name" />
          </div>
          <div class="control">
            <b-button icon-left="edit" type="is-primary" @click="changeName">
              Change Name
            </b-button>
          </div>
        </div>
        <b-button class="is-primary is-light" @click="switchView"
          >Return to past visits view</b-button
        >
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
              :favoriteLists="favorites_lists"
              :deleteFromList="deleteFromList"
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
import FavoritesManager from "./FavoritesManager.vue";

export default {
  created() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      this.getUserById().then(u => {
        this.profile = u;
      });
      this.loadVisits();
      this.getFavoritesLists().then(l => {
        this.favorites_lists = l.items;
      });
    },
    async loadVisits() {
      this.visited_restaurants = [];
      this.getRestaurantVisits(this.currentPage - 1).then(v => {
        if (v != undefined) {
          this.restaurant_visits = v.items;
        }
        this.loadVisitedRestaurants();
        this.total_visits = v.total;
      });
    },
    async getUserById() {
      this.isUserLoaded = false;
      const user = await this.apiUsers.getUserById(this.userId);
      this.isUserLoaded = true;
      return user;
    },
    async getRestaurantVisits(page) {
      this.isVisitedRestaurantsloaded = false;
      const visitedRestaurants = await this.apiVisits.getAllRestaurantsVisits(
        page
      );
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
      let restaurantIds = this.restaurant_visits
        .map(v => v.restaurant_id)
        .filter((item, pos, self) => self.indexOf(item) === pos);

      for (let i = 0; i < restaurantIds.length; i++) {
        let currentRestaurantVisits = this.restaurant_visits.filter(
          visit => visit.restaurant_id === restaurantIds[i]
        );
        this.getRestaurant(restaurantIds[i]).then(r => {
          this.visited_restaurants.push({
            restaurant: r,
            visits: currentRestaurantVisits
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
      for (let i = 0; i < restaurantIds.length; i++) {
        this.getRestaurant(restaurantIds[i]).then(r => {
          this.current_favorites_with_restaurants.restaurants.push(r);
        });
      }
    },
    async deleteSelectedList(listId) {
      let response = await this.apiFavorites.deleteFavoriteList(listId);

      this.favorites_lists = this.favorites_lists.filter(f => f.id != listId);
      if (this.current_favorites_list.id == listId) {
        this.display_past_visits = true;
      }
      if (!response) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Error posting information, please try again`,
          position: "is-top",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `List deleted successfully`,
          position: "is-bottom",
          type: "is-success"
        });
      }
    },
    switchView() {
      this.display_past_visits = !this.display_past_visits;
    },
    async deleteFromList(restaurantId) {
      let response = await this.apiFavorites.deleteRestaurantFromList(
        this.current_favorites_list.id,
        restaurantId
      );

      this.current_favorites_list.restaurants = this.current_favorites_list.restaurants.filter(
        r => r.id != restaurantId
      );
      if (!response) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Error posting information, please try again`,
          position: "is-top",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `List deleted successfully`,
          position: "is-bottom",
          type: "is-success"
        });
      }
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    changeName() {
      this.changeFavoriteListName().then(() => {
        this.toggleEditMode();
        this.favorites_lists.forEach((f) => {
          if(f.id == this.current_favorites_list.id) {
            f.name = this.current_favorites_list.name;
          }
        })
      });
    },
    async changeFavoriteListName() {
      let response = this.apiFavorites.updateFavoriteList(
        this.current_favorites_list.id,
        this.current_favorites_list.name,
        this.current_favorites_list.owner
      )
      if (!response) {
        this.$buefy.toast.open({
          duration: 5000,
          message: `Error posting information, please try again`,
          position: "is-top",
          type: "is-danger"
        });
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: `List updated successfully`,
          position: "is-bottom",
          type: "is-success"
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
      display_past_visits: true,
      total_visits: 0,
      visit_per_page: 10,
      currentPage: 1,
      editMode: false
    };
  },
  components: {
    RestaurantCard,
    FavoritesManager
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
</style>
