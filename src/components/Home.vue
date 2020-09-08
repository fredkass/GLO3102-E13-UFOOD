<template>
  <div class="home">
    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <img class="logoBanner" src="../img/ufood-logo-transparent.png" />
          <div class="button-block">
            <button class="button is-xl is-dark">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content mx-5">
      <div class="columns">
        <template v-if="showSideBar || !isMobile">
          <div class="column is-one-quarter-desktop">
            <aside class="sideMenu">
              <p class="menu-label"><b>Filters</b></p>
              <ul>
                <li>
                  <div class="buttons has-addons">
                    <button class="button">$</button>
                    <button class="button is-info is-selected">$$</button>
                    <button class="button">$$$</button>
                    <button class="button">$$$$</button>
                    <button class="button">$$$$$</button>
                  </div>
                </li>
              </ul>
              <p class="menu-label"><b>Genre</b></p>
              <ul>
                <li>
                  <label class="checkbox">
                    <input type="checkbox" />
                    Pizza
                  </label>
                </li>
                <li>
                  <label class="checkbox">
                    <input type="checkbox" />
                    Breakfast
                  </label>
                </li>
                <li>
                  <label class="checkbox">
                    <input type="checkbox" />
                    Dinner
                  </label>
                </li>
                <li>
                  <label class="checkbox">
                    <input type="checkbox" />
                    Lunch
                  </label>
                </li>
                <li>
                  <label class="checkbox">
                    <input type="checkbox" />
                    Asian
                  </label>
                </li>

                <li>
                  <a>See all</a>
                </li>
              </ul>
            </aside>
          </div>
        </template>

        <div class="column">
          <h1 class="title">Restaurants</h1>
          <div class="columns is-multiline has-border">
            <div class="column is-half-desktop is-full-tablet">
              <div class="box">
                <div class="columns is-mobile">
                  <div class="column is-one-third">
                    <figure class="image is-square">
                      <img src="../img/banner.jpg" alt="Le Square" />
                    </figure>
                  </div>
                  <div class="column">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-half-desktop is-full-tablet">
              <div class="box">
                <div class="columns is-mobile">
                  <div class="column is-one-third">
                    <figure class="image is-square">
                      <img src="../img/banner.jpg" alt="Le Square" />
                    </figure>
                  </div>
                  <div class="column">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-half-desktop is-full-tablet">
              <div class="box">
                <div class="columns is-mobile">
                  <div class="column is-one-third">
                    <figure class="image is-square">
                      <img src="../img/banner.jpg" alt="Le Square" />
                    </figure>
                  </div>
                  <div class="column">
                    <h5 class="title is-5">The Square</h5>
                    <star-rating
                      :inline="true"
                      :star-size="20"
                      :read-only="true"
                      :show-rating="false"
                      :rating="5"
                    ></star-rating>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-half-desktop is-full-tablet">
              <div class="box">
                <div class="columns is-mobile">
                  <div class="column is-one-third">
                    <figure class="image is-square">
                      <img src="../img/banner.jpg" alt="Le Square" />
                    </figure>
                  </div>
                  <div class="column">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br />
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
// export default {
//   created() {
//     window.addEventListener("resize", this.myEventHandler);
//     this.detectWindowSize();
//   },
//   destroyed() {
//     window.removeEventListener("resize", this.myEventHandler);
//   },
//   methods: {
//     myEventHandler(e) {
//       this.detectWindowSize();
//     },
//     detectWindowSize() {
//       var w = window.innerWidth;
//       console.log(w);
//       if (w <= 760) {
//         this.isMobile = true;
//       } else {
//         this.isMobile = false;
//       }
//     }
//   },
//   data() {
//     return {
//       showNav: false,
//       showSideBar: false,
//       isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//         navigator.userAgent
//       )
//     };
//   }
// };
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  background-image: url("../img/banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
}
.welcome {
  width: 400px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
}
.is-xl {
  font-size: 1.7rem;
}
.menu ul li {
  list-style-type: none;
}
.logoBanner {
  height: 180px;
}
.sideMenu ul {
  list-style: none;
}
.image img {
  width: 100%;
  object-fit: cover;
}
.content .box figure {
  margin: 0px;
}
.box:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.box {
  height: 100%;
}
</style>
