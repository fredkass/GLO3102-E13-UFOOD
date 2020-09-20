<template>
  <div class="restaurant-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <b-carousel-list :data="restaurant.pictures" :items-to-show="3" />

          <h1 class="title">
            {{ restaurant.name }}
          </h1>

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
        <div class="columns is-multiline has-text-centered">
          <div class="column is-one-third">
            <div class="menu sticky has-text-left has-border">
              <ul id="menu" class="menu-list">
                <li>
                  <b-button type="is-link" icon-left="phone">
                    {{ restaurant.tel }}
                  </b-button>
                </li>
                <li>
                  <b-button type="is-link" icon-left="directions">
                    Directions
                  </b-button>
                </li>
              </ul>
            </div>
          </div>
          <div class="column is-two-thirds">
            <div class="card">
              <div class="card-content">
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
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// import gmapsInit from '../utils/gmaps'
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
          monday: "12h-14h"
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
  top: 30px;
}
.carousel-list .carousel-slides .carousel-slide {
  display: flex;
  align-items: center;
  max-height: 300px;
}
.has-border ul {
  border: 1px grey solid;
}
</style>
