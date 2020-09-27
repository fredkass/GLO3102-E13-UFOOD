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
            :border-width="2"
            border-color="black"
            :star-size="20"
            :read-only="true"
            :show-rating="false"
            :rating="restaurant.rating"
            :round-start-rating="false"
          ></star-rating>
          {{ restaurant.rating }}
          <h2 class="subtitle ">
            <span
              v-for="(genre, name, index) in restaurant.genres"
              :key="index"
            >
              <strong>{{ genre }}, </strong>
            </span>
            &middot;

            <span v-for="n in restaurant.price_range" :key="n">
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
                  <div id="map" ref="map">
                    <GmapMap
                      ref="mapRef"
                      :center="{
                        lat: restaurant.location.coordinates[1],
                        lng: restaurant.location.coordinates[0]
                      }"
                      :zoom="16"
                      map-type-id="terrain"
                      style="width: 100%; min-height: 300px "
                    >
                      <GmapMarker
                        :position="{
                          lat: restaurant.location.coordinates[1],
                          lng: restaurant.location.coordinates[0]
                        }"
                        :clickable="true"
                        :draggable="true"
                        @click="center = m.position"
                      />
                    </GmapMap>
                  </div>
                  <br />
                </div>
                <div class="column is-half">
                  <strong>{{ restaurant.address }}</strong>
                  <div
                    style="display:flex"
                    v-for="(heures, jours) in restaurant.opening_hours"
                    :key="jours"
                  >
                    <span style="width:40px;">
                      <strong>{{
                        jours.toUpperCase().slice(0, 3)
                      }}</strong></span
                    >
                    <span> : {{ heures === null ? "closed" : heures }}</span>
                  </div>
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
                <b-button
                  type="is-link"
                  icon-left="directions"
                  @click="showDirections"
                  expanded
                >
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
import { gmapApi } from "gmap-vue";
export default {
  name: "restaurant",
  computed: {
    google: gmapApi
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map = map;
      this.directionsDisplay = new this.google.maps.DirectionsRenderer();
    });
  },
  data() {
    return {
      map: undefined,
      directionsDisplay: undefined,
      isDirectionShown: false,
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
        opening_hours: {
          monday: "12:00-21:00",
          thursday: "12:00-21:00",
          wednesday: "12:00-18:00",
          tuesday: "12:00-21:00",
          friday: "12:00-21:00",
          saturday: "09:00-21:00",
          sunday: null
        }
      }
    };
  },
  methods: {
    showDirections() {
      this.directionsDisplay.setMap(this.map);

      if (!this.isDirectionShown) {
        const directionsService = new this.google.maps.DirectionsService();
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              directionsService.route(
                {
                  origin: pos,
                  destination: {
                    lat: this.restaurant.location.coordinates[1],
                    lng: this.restaurant.location.coordinates[0]
                  },
                  travelMode: "DRIVING"
                },
                (response, status) => {
                  if (status === "OK") {
                    this.directionsDisplay.setDirections(response);
                    this.isDirectionShown = true;
                    console.log(response);
                  } else {
                    window.alert("Directions failed");
                  }
                }
              );
              console.log(pos);
            },
            () => {
              window.alert("Directions failed");
            }
          );
        } else {
          window.alert("Directions failed");
        }
      } else {
        this.directionsDisplay.setDirections({ routes: [] });
        this.map.setCenter({
          lat: this.restaurant.location.coordinates[1],
          lng: this.restaurant.location.coordinates[0]
        });
        this.map.setZoom(16);
        this.isDirectionShown = false;
      }
    }
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
