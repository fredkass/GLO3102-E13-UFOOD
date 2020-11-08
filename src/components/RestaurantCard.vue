<template>
  <div class="restaurant-box">
    <div class="box">
      <div class="columns is-mobile">
        <div class="column is-half">
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
        <div class="column is-half">
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
          <button class="button is-primary" @click="toggleModal(restaurant.id)">
            Mark as visited
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RestaurantCard",
  props: ["restaurant", "toggleModal"]
};
</script>
<style>
.box:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.box {
  height: 100%;
}
.image img {
  width: 100%;
  object-fit: cover;
}
.content .box figure {
  margin: 0;
}
</style>
