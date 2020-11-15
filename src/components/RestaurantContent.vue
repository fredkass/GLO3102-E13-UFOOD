<template>
  <div class="restaurant-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <b-carousel-list :data="carouselPictures" v-bind="carouselProperties" />
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
          {{ restaurant.rating.toFixed(2) }}
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
          <div class="buttons-header">
            <slot></slot>

            <modale-button
              v-if="userId"
              :restaurantId="restaurant.id"
              :userId="userId"
              color="is-dark"
            />
          </div>
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
                  <div id="map">
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
import ModaleButton from "./ModaleButton.vue";

export default {
  name: "RestaurantContent",
  props: ["restaurant"],
  computed: {
    google: gmapApi
  },
  components: {
    ModaleButton
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.mapRef.$mapPromise.then(map => {
        this.map = map;
        this.directionsDisplay = new this.google.maps.DirectionsRenderer();
      });
    });
    this.carouselPictures = this.showPicturesCarousel();
  },
  data() {
    return {
      map: undefined,
      directionsDisplay: undefined,
      isDirectionShown: false,
      carouselPictures: undefined,
      carouselProperties: {
        itemsToShow: 1,
        breakpoints: {
          768: {
            itemsToShow: 2
          },
          960: {
            itemsToShow: 4
          }
        }
      },
      //harcoded
      userId: "5fa6c9524a1f410004c5114b"
    };
  },

  methods: {
    showPicturesCarousel() {
      return this.restaurant.pictures.map(i => ({ title: "", image: i }));
    },
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
                  } else {
                    window.alert("Directions failed");
                  }
                }
              );
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
.hero-body .buttons-header button{
  margin:0.5em;  
  display:block;
}
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
