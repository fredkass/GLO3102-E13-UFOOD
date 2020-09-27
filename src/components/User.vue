<template>
  <div class="user-profile">
    <div class="columns">
      <div class="column is-one-quarter">
        <div class="box profile-container has-text-centered">
          <figure class="image profile">
            <img
              src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1601273955&Signature=meBVGTd53ut91D6gCOwE8Zwun60NUAlDwAB2Okj2LGm0EoC12iu8B5Tthah-RFR9XPibt-3wI1ruv9ex3~tlAtUAsvXNZz2-AVRJ33L64Qn5qmo~F4YGxsuPvSBagP0hBRhSA7eVzgohLu9gIEbNqw9IFOdgeLgjP3eM3GGLSuWMe152iVyLmIiKUGhPIADJ5AmjM5qoamjXjdPXgJsOONsghDUnn76n3x76b-dLO3PgLMTWdx39IKA9Osiip5CLPA7AqFqfzdzfqruV9Fhu2Ns-kd13N45ItzW-Q8ttLcXg4mVDn7EJ2oQlpxZ6LxfVHJbPofXbHnnb68qeUeUF5g__&Key-Pair-Id=APKAJSDH2OZQQSA64LQQ"
            />
          </figure>
          <h4 class="subtitle is-5">Profile Info</h4>
          <p>
            {{ profile.name }}
          </p>
          <p>Your rating: {{ profile.score }}</p>
          <b-button type="is-primary" tag="router-link" :to="{ path: '/' }">
            Log Out</b-button
          >
        </div>
      </div>
      <div class="column is-three-quarters">
        <h1 class="title">Previous visits</h1>
        <div class="columns is-multiline">
          <div
            class="column is-half-desktop is-full-tablet"
            v-for="restaurant in restaurants"
            :key="restaurant.id"
          >
            <div v-if="profile.visited_restaurants.includes(restaurant.name)">
              <div class="box">
                <div class="columns is-mobile">
                  <div class="column is-one-third">
                    <b-carousel :autoplay="false" :indicator="false">
                      <b-carousel-item
                        v-for="(carousel, i) in restaurant.pictures"
                        :key="i"
                      >
                        <figure class="image is-square">
                          <img
                            v-bind:src="carousel"
                            v-bind:alt="restaurant.name"
                          />
                        </figure>
                      </b-carousel-item>
                    </b-carousel>
                  </div>
                  <div class="column">
                    <h5 class="title is-5">
                      {{ restaurant.name }} (<span
                        v-for="n in restaurant.price_range"
                        :key="n"
                        ><strong>$</strong></span
                      >)
                    </h5>
                    <star-rating
                      :inline="true"
                      :star-size="20"
                      :read-only="true"
                      :show-rating="false"
                      :rating="restaurant.rating"
                    ></star-rating>
                    <p>
                      Genres:
                      <span v-for="genre in restaurant.genres" :key="genre"
                        >{{ genre }},
                      </span>
                    </p>
                    <div class="address">{{ restaurant.address }}</div>
                    <div class="telephone">{{ restaurant.tel }}</div>
                  </div>
                </div>
              </div>
            </div>
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
        name: "Frédéric Kassab",
        score: 4.8,
        visited_restaurants: [
          "Chez Victor",
          "Chandha",
          "Gaspésienne 51",
          "Snack-bar chez Raymond"
        ]
      },
      restaurants: [
        {
          id: 1,
          name: "Chandha",
          address: "1292 rue Léger",
          tel: "(418)-418-4800",
          genres: ["Asiatique", "Takeout"],
          rating: 4.7,
          price_range: 2,
          pictures: [require("../img/banner.jpg")],
          menu: {
            monday: "12h-14h"
          }
        },
        {
          id: 2,
          name: "Chez Victor",
          address: "100 boul. Laurier",
          tel: "(814)-888-4800",
          genres: ["Burger", "Takeout"],
          rating: 4.0,
          price_range: 3,
          pictures: [
            require("../img/banner.jpg"),
            require("../img/banner.jpg")
          ],
          menu: {
            monday: "12h-14h"
          }
        },
        {
          id: 3,
          name: "Gaspésienne 51",
          address: "1005 Chemin St-Louis",
          tel: "(418)-898-5858",
          genres: ["Fruits de mer", "Poisson"],
          rating: 4.3,
          price_range: 4,
          pictures: [
            require("../img/banner.jpg"),
            require("../img/banner.jpg")
          ],
          menu: {
            monday: "12h-14h"
          }
        },
        {
          id: 4,
          name: "Snack-bar chez Raymond",
          address: "500 boul. Laurier",
          tel: "(800)-888-9999",
          genres: ["Géduilles", "Snack"],
          rating: 2.6,
          price_range: 1,
          pictures: [
            require("../img/banner.jpg"),
            require("../img/banner.jpg")
          ],
          menu: {
            monday: "12h-14h"
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
.user-profile {
  padding-top: 70px;
}
.image img {
  width: 100%;
  object-fit: cover;
}
.box:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.profile-container p {
  line-height: 2.5em;
}
.profile-container .profile img {
  max-height: 350px;
  max-width: 350px;
  overflow: hidden;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
