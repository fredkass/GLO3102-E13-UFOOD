<template>
  <b-navbar :fixed-top="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <figure class="image is-32x32 is-inline">
          <img class="logoNav" src="../img/ufood-logo-no-text.png" />
        </figure>
        <strong class="is-size-4">UFOOD</strong>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/restaurant' }">
        Restaurant
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/user' }">
        User Profile
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script></script>
<style lang="scss" scoped>
nav {
  padding-top: 10px;
  padding-bottom: 10px;
  a {
    font-weight: bold;
  }
}
</style>
