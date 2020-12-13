<template>
  <div class="home">
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <img
            class="logoBanner"
            src="../img/ufood-logo-transparent.png"
            alt="ufood-logo-transparent.png"
          />
          <div class="button-block">
            <button class="button is-xl is-dark">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    <div class="home-page">
      <div class="columns">
        <template v-if="isNavbarOpen">
          <div class="column is-narrow">
            <sidebar
              @updatePrice="priceFilterChanged"
              @updateGenre="genreFilterChanged"
            ></sidebar>
          </div>
        </template>
        <div class="column">
          <h1 class="title">Restaurants</h1>
          <b-pagination
            :total="totalPages"
            v-model="currentPage"
            :per-page="restaurantsPerPage"
            @change="updateRestaurants"
          >
          </b-pagination>

          <b-button @click="toggleMapMode" icon-left="map">{{
            !isMapMode ? "Map" : "List"
          }}</b-button>
          <b-button
            v-if="isMobile || isWindowReduced"
            @click="isNavbarOpen = !isNavbarOpen"
            icon-left="filter"
            >Filters</b-button
          >
          <b-field>
            <b-input
              v-model="searchFilterTerms"
              placeholder="Search restaurants"
            ></b-input>
            <b-button
              icon-left="search"
              type="is-primary"
              @click="updateRestaurants"
            >
              Search
            </b-button>
          </b-field>
          <SearchAutoComplete
            :restaurants="getRestaurants"
            @change="updateRestaurants"
            v-model="searchFilterTerms"
          >
          </SearchAutoComplete>
          <div class="columns is-multiline">
            <div
              class="column is-half-desktop is-full-tablet"
              v-if="restaurants.length < 1 && this.isRestaurantsLoaded"
            >
              No Restaurants found
            </div>
            <div
              v-bind:class="{
                column: true,
                'is-half-desktop': !isMapMode,
                'is-full-tablet': !isMapMode
              }"
              v-for="restaurant in restaurants"
              :key="restaurant.id"
            >
              <restaurant-card
                :restaurant="restaurant"
                :user="user"
                :provenance="provenance"
                :hideModal="false"
                :isLoaded="isRestaurantsLoaded"
              />
            </div>
          </div>
        </div>
        <div class="column is-half-desktop is-full-tablet" v-if="isMapMode">
          <restaurant-map
            v-if="restaurants.length > 0"
            :restaurants="restaurants"
            :currentPos="currentPos"
          ></restaurant-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarFilter from "./SidebarFilter.vue";
import RestaurantService from "@/services/RestaurantService.js";
import RestaurantCard from "./RestaurantCard.vue";
import RestaurantMap from "./RestaurantMap.vue";
import SearchAutoComplete from "@/components/SearchAutoComplete";

export default {
  name: "home",
  created() {
    window.addEventListener("resize", this.myEventHandler);
    this.isNavbarOpen = !this.isMobile;
    this.detectWindowSize();

    this.updateRestaurants();
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    toggleMapMode() {
      if (!this.isMapMode) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.currentPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(this.currentPos);
            this.updateRestaurants();
          },
          () => {
            this.currentPos = {
              lat: this.restaurants[0].location.coordinates[1],
              lng: this.restaurants[0].location.coordinates[0]
            };
            console.log(this.currentPos);

            this.updateRestaurants();
            window.alert("Impossible to determine location");
          }
        );
      }
      this.isMapMode = !this.isMapMode;
    },
    priceFilterChanged(value) {
      this.price_range_filter = value;
      this.updateRestaurants();
    },
    genreFilterChanged(value) {
      this.genres_filter = value;
      this.updateRestaurants();
    },
    updateRestaurants() {
      this.getRestaurants().then(r => {
        this.totalPages = r.total;
        this.restaurants = r.items;
      });
    },
    async getRestaurants() {
      this.isRestaurantsLoaded = false;
      const lat = this.isMapMode ? this.currentPos.lat : "";
      const lon = this.isMapMode ? this.currentPos.lng : "";
      const restaurants = await this.apiRestaurant.getRestaurants(
        this.currentPage - 1,
        this.searchFilterTerms,
        null,
        this.genres_filter,
        this.price_range_filter,
        lat,
        lon
      );
      this.isRestaurantsLoaded = true;
      return restaurants;
    },
    myEventHandler() {
      this.detectWindowSize();
    },
    detectWindowSize() {
      var w = window.innerWidth;
      if (w <= 1025 && !this.isMobile) {
        this.isNavbarOpen = false;
        this.isWindowReduced = true;
      } else if (w > 1025 && !this.isMobile) {
        this.isNavbarOpen = true;
        this.isWindowReduced = false;
      }
    }
  },
  data() {
    return {
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      isNavbarOpen: true,
      isWindowReduced: false,
      restaurants: [],
      apiRestaurant: new RestaurantService(this.$root.user.token),
      currentPage: 1,
      totalPages: 100,
      restaurantsPerPage: 10,
      searchFilterTerms: "",
      price_range_filter: [],
      genres_filter: [],
      isRestaurantsLoaded: false,
      isComponentModalActive: false,
      restaurantModalId: 0,
      provenance: "home",
      user: this.$root.user,
      isMapMode: false,
      currentPos: {}
    };
  },
  components: {
    SearchAutoComplete,
    sidebar: SidebarFilter,
    RestaurantCard,
    RestaurantMap
  }
};
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  background-image: url("../img/banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
}
.welcome {
  width: 400px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
}
.is-xl {
  font-size: 1.7rem;
}

.logoBanner {
  height: 180px;
}
</style>
