<template>
  <div class="user-profile">
    <div class="columns">
      <div class="column is-one-quarter">
        <b-sidebar
          position="static"
          :mobile="mobile"
          :expand-on-hover="expandOnHover"
          :reduce="reduce"
          type="is-light"
          open
        >
          <div class="infos-profile">
            <div class="block">
              <img
                src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1601273955&Signature=meBVGTd53ut91D6gCOwE8Zwun60NUAlDwAB2Okj2LGm0EoC12iu8B5Tthah-RFR9XPibt-3wI1ruv9ex3~tlAtUAsvXNZz2-AVRJ33L64Qn5qmo~F4YGxsuPvSBagP0hBRhSA7eVzgohLu9gIEbNqw9IFOdgeLgjP3eM3GGLSuWMe152iVyLmIiKUGhPIADJ5AmjM5qoamjXjdPXgJsOONsghDUnn76n3x76b-dLO3PgLMTWdx39IKA9Osiip5CLPA7AqFqfzdzfqruV9Fhu2Ns-kd13N45ItzW-Q8ttLcXg4mVDn7EJ2oQlpxZ6LxfVHJbPofXbHnnb68qeUeUF5g__&Key-Pair-Id=APKAJSDH2OZQQSA64LQQ"
              />
            </div>
            <b-menu class="is-custom-mobile">
              <b-menu-list label="Profile info">
                <p>
                  {{ profile.name }}
                </p>
                <p>Rating: {{ profile.score }}</p>
                <b-menu-item label="Logout"></b-menu-item>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
      </div>
      <div class="column is-three-quarters">
        <p class="bd-notification is-danger">Visited Restaurants</p>
        <div class="columns is-mobile">
          <div class="column">
            <p class="bd-notification is-danger">50%</p>
          </div>
          <div class="column">
            <p class="bd-notification is-danger">Auto</p>
          </div>
          <div class="column">
            <p class="bd-notification is-danger">Auto</p>
          </div>
          <div class="column">
            <p class="restau4">restau</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      profile: {
        name: "Gordon Ramsey",
        score: 4.8,
        visited_restaurants: [
          "MrBurger",
          "Chandha",
          "Gaspésienne 51",
          "Snack-bar chez Raymond"
        ]
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.user-profile {
  padding-top: 70px;
  padding-left: 10px;
}
</style>
