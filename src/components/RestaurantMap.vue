<template>
  <div class="restaurant-map">
    <GmapMap
      :center="currentPos"
      :zoom="13"
      map-type-id="terrain"
    >
      <GmapMarker
        :key="id"
        v-for="(restaurant, id) in restaurants"
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
</template>
<script>
import { gmapApi } from "gmap-vue";

export default {
  name: "RestaurantMap",
  props: ["restaurants"],
  computed: {
    google: gmapApi
  },

  mounted() {
    this.currentPos = {
      lat: this.restaurants[0].location.coordinates[1],
      lng: this.restaurants[0].location.coordinates[0]
    };
    navigator.geolocation.getCurrentPosition(
      position =>
        (this.currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
      () => {
        this.currentPos = {
          lat: this.restaurants[0].location.coordinates[1],
          lng: this.restaurants[0].location.coordinates[0]
        };
        window.alert("Impossible to determine location");
      }
    );
  },
  data() {
    return {
      map: undefined,
      currentPos: {}
    };
  }
};
</script>
<style scoped>
.restaurant-map{
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
  left: 0; right: 0; top: 0; bottom: 0;
  position: absolute;
}

.vue-map-hidden {
  display: none;
}
</style>
