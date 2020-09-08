<template>
  <nav class="navbar container" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <figure class="image is-32x32 is-inline">
          <img class="logoNav" src="../img/ufood-logo-no-text.png" />
        </figure>
        <strong class="is-size-4">UFOOD</strong>
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="isOpen = !isOpen"
        v-bind:class="{ 'is-active': isOpen }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbar" class="navbar-menu" v-bind:class="{ 'is-active': isOpen }">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/restaurant" class="navbar-item"
          >Restaurant</router-link
        >
        <router-link to="/user" class="navbar-item">User Profile</router-link>
      </div>
    </div>
    <div class="navbar-end  is-centered">
      <div class="navbar-item">
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Rechercher" />
          </div>
          <div class="control">
            <a class="button is-primary">
              Search
            </a>
          </div>
        </div>
      </div>
      <hr class="navbar-divider" />
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-dark">
            <strong>Sign In</strong>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data: function() {
    return {
      isOpen: false
    };
  }
};
</script>
<style lang="scss" scoped>
nav {
  margin-top: 15px;
  margin-bottom: 15px;
  a {
    font-weight: bold;
    color: #2c3e50;
    // &.router-link-exact-active {
    //   color: #1c9e11;
    // }
  }
}
</style>
