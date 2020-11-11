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

          <div class="columns is-multiline" v-if="!this.isRestaurantsLoaded">
            <div
              class="column is-half-desktop is-full-tablet"
              v-for="index in restaurantsPerPage"
              :key="index"
            >
              <div class="box">
                <div class="columns is-mobile">
                  <div class="column is-one-third">
                    <b-carousel :autoplay="false" :indicator="false">
                    </b-carousel>
                  </div>
                  <div class="column">
                    <h5 class="title is-5">
                      <b-skeleton :animated="true"></b-skeleton>
                    </h5>
                    <b-skeleton :animated="true"></b-skeleton>
                    <b-skeleton :animated="true"></b-skeleton>
                    <b-skeleton :animated="true"></b-skeleton>
                    <b-skeleton :animated="true"></b-skeleton>
                    <b-skeleton :animated="true"></b-skeleton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns is-multiline">
            <div
              class="column is-half-desktop is-full-tablet"
              v-if="restaurants.length < 1 && this.isRestaurantsLoaded"
            >
              No Restaurants found
            </div>
            <div
              class="column is-half-desktop is-full-tablet"
              v-for="restaurant in restaurants"
              :key="restaurant.id"
            >
              <restaurant-card
                :restaurant="restaurant"
                :userId="userId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarFilter from "./SidebarFilter.vue";
import RestaurantService from "@/services/RestaurantService.js";
import RestaurantCard from "./RestaurantCard.vue";

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
      const restaurants = await this.apiRestaurant.getRestaurants(
        this.currentPage - 1,
        this.searchFilterTerms,
        null,
        this.genres_filter,
        this.price_range_filter
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
      apiRestaurant: new RestaurantService(),
      currentPage: 1,
      totalPages: 100,
      restaurantsPerPage: 10,
      searchFilterTerms: "",
      price_range_filter: [],
      genres_filter: [],
      isRestaurantsLoaded: false,
      isComponentModalActive: false,
      restaurantModalId: 0,
      //harcoded
      userId: "5fa6c9524a1f410004c5114b"
    };
  },
  components: {
    sidebar: SidebarFilter,
    RestaurantCard,
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
