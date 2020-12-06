<template>
  <div class="restaurant-map">
    <GmapMap ref="mapRef" :center="currentPos" :zoom="13" map-type-id="terrain">
      <GmapMarker
        :key="id"
        v-for="(restaurant, id) in restaurants"
        :position="{
          lat: restaurant.location.coordinates[1],
          lng: restaurant.location.coordinates[0]
        }"
        :clickable="true"
        :draggable="true"
        @click="
          center = {
            lat: restaurant.location.coordinates[1],
            lng: restaurant.location.coordinates[0]
          }
        "
      />
    </GmapMap>
  </div>
</template>
<script>
import { gmapApi } from "gmap-vue";

export default {
  name: "RestaurantMap",
  props: ["restaurants", "currentPos"],
  computed: {
    google: gmapApi
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
      map: undefined
    };
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
