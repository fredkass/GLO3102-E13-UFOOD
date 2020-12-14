<template>
  <div v-if="!userIsFollowed" class="btn-follow">
    <button class="button" @click="follow">
      Follow
    </button>
  </div>
  <div v-else class="btn-unfollow">
    <button class="button" @click="unfollow">
      Unfollow
    </button>
  </div>
</template>
<script>
import UsersService from "../../services/UsersService.js"

export default {
  name: "FollowButton",
  props: ["targetUser"],
  mounted() {
    this.user = this.$root.user;
    this.apiUsers = new UsersService(this.user.token);
    this.establishFollowage();
  },
  data() {
    return {
      user: {},
      apiUsers: {},
      userIsFollowed: false
    };
  },
  methods: {
    follow() {
      this.followUser().then(() => {
        this.userIsFollowed = !this.userIsFollowed;
      });
    },
    unfollow() {
      this.unfollowUser().then(() => {
        this.userIsFollowed = !this.userIsFollowed;
      });
    },
    async followUser() {
      await this.apiUsers.followUser(this.targetUser.id);
    },
    async unfollowUser() {
      await this.apiUsers.unfollowUser(this.targetUser.id);
    },
    establishFollowage() {
      this.user.following.forEach(user => {
        if (user.id == this.targetUser.id) {
          this.userIsFollowed = true;
        }
      });
    }
  }
};
</script>
