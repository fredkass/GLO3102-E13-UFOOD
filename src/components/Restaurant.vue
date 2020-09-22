<template>
  <div class="restaurant-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <b-carousel-list :data="restaurant.pictures" :items-to-show="4" />
        <div class="container">
          <h1 class="title">
            {{ restaurant.name }}
          </h1>
          <star-rating
            :inline="true"
            border-width="2"
            border-color="black"
            :star-size="20"
            :read-only="true"
            :show-rating="false"
            :rating="restaurant.rating"
            :round-start-rating="false"
          ></star-rating>
          {{ restaurant.rating }}
          <h2 class="subtitle ">
            <span v-for="(genre, i) in restaurant.genres" :key="i">
              <strong>{{ genre }}, </strong>
            </span>
            &middot;

            <span v-for="(n, i) in restaurant.price_range" :key="i">
              <strong>$</strong>
            </span>
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-two-thirds">
            <div class="box">
              <div class="columns">
                <div class="column is-half">
                  <div id="map" ref="map"></div>
                  <br />
                </div>
                <div class="column is-half">
                  <strong>{{ restaurant.address }}</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-one-third">
            <div class="menu sticky has-text-left has-border">
              <div class="buttons">
                <b-button type="is-link" icon-left="phone" expanded>
                  {{ restaurant.tel }}
                </b-button>
                <b-button type="is-link" icon-left="directions" expanded>
                  Directions
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "restaurant",
  data() {
    return {
      albums: [{}],
      restaurant: {
        id: 1,
        name: "Chandha",
        address: "1292 rue Léger",
        tel: "(418)-418-4800",
        genres: ["Asiatique", "Takeout"],
        rating: 4.7,
        price_range: 2,
        location: {
          type: "Point",
          coordinates: [-71.2180951, 46.8178912]
        },
        pictures: [
          {
            title: "Slide 1",
            image: require("../img/food/food1.jpg")
          },
          {
            title: "Slide 2",
            image: require("../img/food/food2.jpg")
          },
          {
            title: "Slide 3",
            image: require("../img/food/food3.jpg")
          },
          {
            title: "Slide 4",
            image: require("../img/food/food4.jpg")
          },
          {
            title: "Slide 5",
            image: require("../img/food/food5.jpg")
          },
          {
            title: "Slide 6",
            image: require("../img/food/food6.jpg")
          }
        ],
        menu: {
          monday: "12:00-21:00",
          thursday: "12:00-21:00",
          wednesday: "12:00-21:00",
          tuesday: "12:00-21:00",
          friday: "12:00-21:00",
          saturday: "12:00-21:00",
          sunday: null
        }
      }
    };
  }
};
</script>
<style>
#map {
  width: 100%;
  height: 300px;
  background: gray;
}
.sticky {
  position: sticky;
  top: 100px;
}
.carousel-list .carousel-slides .carousel-slide {
  display: flex;
  align-items: center;
  max-height: 300px;
}
.carousel-list .carousel-slides .carousel-slide .image {
  height: 100%;
}
.carousel-list .carousel-slides .carousel-slide .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.has-border ul {
  border: 1px lightgray solid;
}
</style>
