<template>
  <div class="restaurant-map">
    <GmapMap ref="mapRef" :center="currentPos" :zoom="13" map-type-id="terrain">
      <Gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <restaurant-card v-if="currentRestaurant" :restaurant="currentRestaurant" :isLoaded="true"></restaurant-card>
      </Gmap-info-window>
      <GmapMarker
        :key="id"
        v-for="(restaurant, id) in restaurants"
        :position="{
          lat: restaurant.location.coordinates[1],
          lng: restaurant.location.coordinates[0]
        }"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(restaurant, id)"
      />
    </GmapMap>
  </div>
</template>
<script>
import { gmapApi } from "gmap-vue";
import RestaurantCard from "./RestaurantCard.vue";

export default {
  name: "RestaurantMap",
  props: ["restaurants", "currentPos"],
  computed: {
    google: gmapApi
  },
  components: {
    RestaurantCard
  },
  beforeUpdate() {
    this.$refs.mapRef.$mapPromise.then(map => {
      var bounds = new this.google.maps.LatLngBounds();
      this.restaurants.forEach(r => {
        bounds.extend(
          new this.google.maps.LatLng(
            r.location.coordinates[1],
            r.location.coordinates[0]
          )
        );
      });
      map.fitBounds(bounds);
    });
  },
  data() {
    return {
      map: undefined,
      infoWindowPos: null,
      infoWinOpen: false,
      currentRestaurant: null,
      infoOptions: {
        //content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    toggleInfoWindow: function(restaurant, idx) {
      this.currentRestaurant = restaurant;
      this.infoWindowPos = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      //this.infoOptions.content = restaurant.name;

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
  }
};
</script>
<style scoped>
.restaurant-map {
  height: calc(-97px + 100vh);
  position: sticky;
  top: 100px;
}
.vue-map-container,
.vue-map-container .vue-map {
  width: 100%;
  height: 100%;
}
.vue-map-container {
  position: relative;
}

.vue-map-container .vue-map {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
}

.vue-map-hidden {
  display: none;
}
</style>
