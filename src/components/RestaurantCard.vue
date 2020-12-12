<template>
  <div class="restaurant-box">
    <div class="box" v-if="!isLoaded">
      <div class="columns is-mobile">
        <div class="column is-one-third">
          <b-carousel :autoplay="false" :indicator="false"> </b-carousel>
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

    <div class="box" v-if="isLoaded">
      <div class="columns">
        <div class="column">
          <b-carousel :autoplay="false" :indicator="false">
            <b-carousel-item
              v-for="(carousel, i) in restaurant.pictures"
              :key="i"
            >
              <figure class="image is-square">
                <img v-bind:src="carousel" v-bind:alt="restaurant.name" />
              </figure>
            </b-carousel-item>
          </b-carousel>
        </div>
        <div class="column">
          <h5 class="title is-5">
            <router-link :to="'restaurant/' + restaurant.id">{{
              restaurant.name
            }}</router-link>
            (<span v-for="n in restaurant.price_range" :key="n"
              ><strong>$</strong></span
            >)
          </h5>
          <star-rating
            :inline="true"
            :star-size="20"
            :read-only="true"
            :show-rating="true"
            :rating="restaurant.rating"
            :fixed-points="1"
            :increment="0.1"
          ></star-rating>
          <p>
            Genres:
            <span v-for="genre in restaurant.genres" :key="genre"
              >{{ genre }},
            </span>
          </p>
          <div class="address">{{ restaurant.address }}</div>
          <div class="telephone">{{ restaurant.tel }}</div>
          <modale-button
            v-if="user && this.hideModal == false"
            :restaurantId="restaurant.id"
            :user="user"
            :provenance="provenance"
            :visits="visits"
            color="is-primary"
          />
          <dropdown-favorites
            v-if="favoriteLists"
            :favoriteLists="favoriteLists"
            :addToListEvent="addToList"
          ></dropdown-favorites>
          <b-button
            type="is-danger is-small"
            v-if="deleteFromList"
            @click="deleteFromList(restaurant.id)"
            >Delete</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DropdownFavorites from "./DropdownFavorites.vue";
import ModaleButton from "./ModaleButton.vue";
import FavoriteRestaurantsService from "./../services/FavoriteRestaurantsService.js";

export default {
  name: "RestaurantCard",
  props: [
    "isLoaded",
    "restaurant",
    "user",
    "provenance",
    "visits",
    "hideModal",
    "favoriteLists",
    "deleteFromList"
  ],
  components: {
    ModaleButton,
    DropdownFavorites
  },
  data() {
    return {
      userId: this.user.id,
      apiFavorites: new FavoriteRestaurantsService(this.user.token)
    };
  },
  methods: {
    async addToList(listId) {
      let response = await this.apiFavorites.addRestaurantToList(
        listId,
        this.restaurant.id
      );

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
      this.$emit("addedToFavorite");
    }
  }
};
</script>
<style scoped>
.box:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.box {
  height: 100%;
  min-width:300px;
}
</style>

<style>
.image img {
  width: 100%;
  object-fit: cover;
}
.content .box figure {
  margin: 0;
}

.restaurant-box .box button {
  margin: 0.5em;
}
</style>
