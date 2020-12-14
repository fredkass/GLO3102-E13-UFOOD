<template>
  <div class="section">
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="box profile-container has-text-centered">
          <figure class="image profile">
            <img :src="this.gravatarURL" alt="user icon" />
          </figure>
          <h4 class="subtitle is-5">Profile Info</h4>
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
            :userId="user.id"
            :deleteSelectedList="deleteSelectedList"
            :createNewList="createAndAddList"
          ></favorites-manager>
          <followage
            :userId="user.id"
            :showFollowersList="switchToFollowers"
            :showFollowingList="switchToFollowing"
          />
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
            v-if="
              visited_restaurants.length < 1 && this.isVisitedRestaurantsloaded
            "
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
              :user="user"
              :provenance="provenance"
              :visits="visit.visits"
              :hideModal="false"
              :favoriteLists="favorites_lists"
              :isLoaded="isVisitedRestaurantsloaded"
            />
          </div>
        </div>
      </div>
      <div v-else-if="display_favorites" class="column is-three-quarters">
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
        <b-button class="is-primary is-light" @click="switchToPastVisits()"
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
              :user="user"
              :provenance="provenance"
              :favoriteLists="favorites_lists"
              :deleteFromList="deleteFromList"
              :isLoaded="isFavoritesListsLoaded"
              @addedToFavorite="
                loadFavoriteListItems(current_favorites_with_restaurants.id)
              "
            />
          </div>
        </div>
      </div>
      <div v-else-if="display_followers" class="column is-three-quarters">
        <h1 class="title">Followers</h1>
        <b-button class="is-primary is-light" @click="switchToPastVisits()"
          >Return to past visits view</b-button
        >
        <div class="columns is-multiline">
          <div
            class="column is-half-desktop is-full-tablet"
            v-if="user.followers.length < 1"
          >
            No follower yet
          </div>
          <div
            class="column is-half-desktop is-full-tablet"
            v-for="follower in this.user.followers"
            :key="follower.index"
          >
            <user-card :user="follower"/>
          </div>
        </div>
      </div>
      <div v-else-if="display_following" class="column is-three-quarters">
        <h1 class="title">Following</h1>
        <b-button class="is-primary is-light" @click="switchToPastVisits()"
          >Return to past visits view</b-button
        >
        <div class="columns is-multiline">
          <div
            class="column is-half-desktop is-full-tablet"
            v-if="user.following.length < 1"
          >
            No following yet
          </div>
          <div
            class="column is-half-desktop is-full-tablet"
            v-for="following in this.user.following"
            :key="following.index"
          >
            <user-card :user="following"/>
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
import GravatarService from "@/services/GravatarService.js";
import Followage from "./Followage.vue";
import UserCard from './UserCard.vue';

export default {
  mounted() {
    this.user = this.$root.user;
    this.apiUsers = new UsersService(this.$root.user.token);
    this.apiVisits = new RestaurantVisistsService(
      this.$root.user.id,
      this.$root.user.token
    );
    this.apiFavorites = new FavoriteRestaurantsService(this.$root.user.token);
    this.apiRestaurants = new RestaurantService(this.$root.user.token);
    this.gravatarURL = new GravatarService(this.user.email).getAvatarURL(200);
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
      this.isVisitedRestaurantsloaded = false;
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
      const user = await this.apiUsers.getUserById(this.user.id);
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
      const lists = await this.apiUsers.getFavoritesListsByUserId(this.user.id);
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
        this.switchToFavorites();
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
      await this.apiFavorites.deleteFavoriteList(listId);

      this.favorites_lists = this.favorites_lists.filter(f => f.id != listId);
      if (this.current_favorites_list.id == listId) {
        this.switchToPastVisits();
      }
    },
    switchToPastVisits() {
      this.display_past_visits = true;
      this.display_favorites = false;
      this.display_following = false;
      this.display_followers = false;
    },
    switchToFavorites() {
      this.display_past_visits = false;
      this.display_favorites = true;
      this.display_following = false;
      this.display_followers = false;
    },
    switchToFollowing() {
      this.display_past_visits = false;
      this.display_favorites = false;
      this.display_following = true;
      this.display_followers = false;
    },
    switchToFollowers() {
      this.display_past_visits = false;
      this.display_favorites = false;
      this.display_following = false;
      this.display_followers = true;
    },
    async deleteFromList(restaurantId) {
      await this.apiFavorites.deleteRestaurantFromList(
        this.current_favorites_list.id,
        restaurantId
      );

      this.current_favorites_list.restaurants = this.current_favorites_list.restaurants.filter(
        r => r.id != restaurantId
      );
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    changeName() {
      this.changeFavoriteListName().then(() => {
        this.toggleEditMode();
        this.favorites_lists.forEach(f => {
          if (f.id == this.current_favorites_list.id) {
            f.name = this.current_favorites_list.name;
          }
        });
      });
    },
    async changeFavoriteListName() {
      this.apiFavorites.updateFavoriteList(
        this.current_favorites_list.id,
        this.current_favorites_list.name,
        this.current_favorites_list.owner
      );
    },
    createAndAddList(name) {
      this.createNewList(name).then(id => {
        this.getFavoriteList(id).then(l => {
          this.favorites_lists.push(l);
        });
      });
    },
    async createNewList(name) {
      let response = await this.apiFavorites.createFavoriteList(
        name,
        this.profile.email
      );
      return response.id;
    }
  },
  data: () => {
    return {
      apiUsers: {},
      apiVisits: {},
      apiFavorites: {},
      apiRestaurants: {},
      user: "",
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
      display_favorites: false,
      display_following: false,
      display_followers: false,
      total_visits: 0,
      visit_per_page: 10,
      currentPage: 1,
      editMode: false,
      gravatarURL: ""
    };
  },
  components: {
    RestaurantCard,
    FavoritesManager,
    Followage,
    UserCard
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
.profile-container button {
  margin-top: 1em;
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
