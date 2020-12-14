<template>
  <b-navbar :fixed-top="true">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <figure class="image is-32x32 is-inline">
          <img
            class="logoNav"
            src="../img/ufood-logo-no-text.png"
            alt="logo-no-text"
          />
        </figure>
        <strong class="is-size-4">UFOOD</strong>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="field has-addons">
            <SearchAutoComplete
              :names="usersAutoComplete"
              :keypressed="updateAutoComplete"
              v-model="searchTerms"
              @keyup.enter.native="search(searchTerms)"
              :search="search"
            >
            </SearchAutoComplete>
          <div class="control">
            <b-button
              icon-left="search"
              type="is-primary"
              @click="search(searchTerms)"
            >
              Search
            </b-button>
          </div>
        </div>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button
            class="button is-primary"
            v-if="!this.isAuthenticated"
            tag="router-link"
            :to="{ path: '/SignUp' }"
          >
            <strong>Sign up</strong>
          </b-button>
          <b-button
            tag="router-link"
            :to="{ path: '/login' }"
            class="button is-light"
            v-if="!this.isAuthenticated"
          >
            Log in
          </b-button>
        </div>
      </b-navbar-item>

      <b-navbar-item
        tag="router-link"
        :to="{ path: '/user' }"
        v-if="this.isAuthenticated"
      >
        <b-button class="button is-primary" icon-left="user">
          <strong>{{ this.user.name }}</strong>
        </b-button>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <a class="button is-light" @click="logout" v-if="this.isAuthenticated">
          Sign out
        </a>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
import SearchAutoComplete from "@/components/SearchAutoComplete";
import UsersService from "@/services/UsersService";

export default {
  components: { SearchAutoComplete },
  props: ["logout", "user"],
  data() {
    return {
      apiUsers: new UsersService(this.user.token),
      searchTerms: "",
      usersAutoComplete: []
    };
  },
  methods: {
    toggleLogIn() {
      this.isLoggedIn = !this.isLoggedIn;
      if (!this.isLoggedIn) {
        this.$router.push({ name: "Home" });
      }
    },
    updateAutoComplete() {
        this.apiUsers.search(this.searchTerms).then(u => {
        this.usersAutoComplete = u.items.map(u => u.name);
      });
    },
    search(input) {
      if (!this.isLoggedIn) {
        if (input === "") {
          this.$router
            .push({
              name: "UserGuestView",
              params: { searchTerms: "all" }
            })
            .catch(() => {});
        } else {
          this.$router
            .push({
              name: "UserGuestView",
              params: { searchTerms: input }
            })
            .catch(() => {});
        }
      } else {
        this.$route.params.searchTerms = input;
      }
    },
  },
  computed: {
    isAuthenticated() {
      return this.$root.authenticated;
    }
  }
};
</script>
<style lang="scss" scoped>
nav {
  padding-top: 10px;
  padding-bottom: 10px;
  a {
    font-weight: bold;
  }
}
</style>
