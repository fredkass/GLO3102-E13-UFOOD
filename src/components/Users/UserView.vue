<template>
  <div class="section">
    <div class="columns">
      <div class="column is-half">
        <div class="box">
          <h1 v-if="userIsLoaded" class="title">{{ targetUser.name }}</h1>
          <p v-if="userIsLoaded" >
            {{ targetUser.email }}
          </p>
          <p v-if="userIsLoaded" >
            {{ targetUser.rating }}
          </p>
          <div>
            <follow-button v-if="userIsLoaded" :targetUser="targetUser" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UsersService from "../../services/UsersService.js";
import FollowButton from "./FollowButton.vue";

export default {
  mounted() {
    this.apiUsers = new UsersService(this.$root.user.token);
    this.targetUser = this.getUser();
  },
  name: "UserView",
  data() {
    return {
      apiUsers: {},
      targetUser: {},
      userId: this.$route.params.userId,
      userIsLoaded: false
    };
  },
  methods: {
    getUser() {
      this.fetchUserInfo().then(u => {
        this.targetUser = u;
        this.userIsLoaded = true;
      });
    },
    async fetchUserInfo() {
      const user = this.apiUsers.getUserById(this.userId);
      return user;
    }
  },
  components: {
    FollowButton
  }
};
</script>
