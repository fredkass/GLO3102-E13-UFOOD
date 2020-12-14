<template>
  <div class="section">
    <div class="columns">
      <div class="column">
        <h1 class="title">Search Results</h1>

        <b-pagination
          :total="total"
          v-model="currentPage"
          :per-page="perPage"
          @change="search"
        >
        </b-pagination>
      </div>
    </div>
    <div class="columns is-multiline">
      <div
        class="column is-half-desktop is-full-tablet"
        v-if="this.usersList.length < 1"
      >
        No results found
      </div>

      <div v-for="user in this.usersList" :key="user.id">
        <user-card :user="user" />
      </div>
    </div>
  </div>
</template>
<script>
import UsersService from "./../services/UsersService.js";
import UserCard from "./UserCard.vue";

export default {
  mounted() {
    this.user = this.$root.user;
    this.search();
  },
  watch: {
    "$route.params.searchTerms": function() {
      this.search();
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.searchTerms) {
      this.searchInput = to.params.searchTerms;
    }
    next();
  },
  name: "UserGuestView",
  data() {
    return {
      total: 0,
      currentPage: 1,
      perPage: 10,
      apiUsers: new UsersService(this.$root.user.token),
      usersList: [],
      searchInput: this.$route.params.searchTerms,
      user: {}
    };
  },
  methods: {
    search() {
      this.getUsers().then(u => {
        this.usersList = u.items;
      });
    },
    async getUsers() {
      if (this.searchInput != "all") {
        const users = await this.apiUsers.search(
          this.searchInput,
          this.currentPage - 1
        );      
        this.total = users.total;
        return users;
      } else {
        const users = await this.apiUsers.getUsers(this.currentPage -1);      
        this.total = users.total;
        return users;
      }
    }
  },
  components: {
    UserCard
  }
};
</script>
