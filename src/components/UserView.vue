<template>
  <div class="section">
    <div class="columns">
      <div class="column is-half">
        <div class="box">
          <h1 class="title">{{ user.name }}</h1>
          <p>
            {{ user.email }}
          </p>
          <p>
            {{ user.rating }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UsersService from "./../services/UsersService.js";

export default {
  mounted() {
    this.user = this.getUser();
    this.search();
  },
  name: "UserView",
  data() {
    return {
      apiUsers: new UsersService(this.$root.user.token),
      user: {},
      userId: this.$route.params.userId
    }
  },
  methods: {
    getUser() {
      this.fetchUserInfo().then(u => {
        this.user = u;
      });
    },
    async fetchUserInfo() {
      const user = this.apiUsers.getUserById(this.userId);
      return user;
    }
  }
};
</script>