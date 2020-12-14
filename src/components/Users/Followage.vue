<template>
  <div class="followage">
    <div class="field">
      <button
        class="button is-primary"
        slot="trigger"
        @click="showFollowersList()"
      >
        <span>Followers ({{ followers_count }})</span>
      </button>
    </div>
    <div class="field">
      <button
        class="button is-primary"
        slot="trigger"
        @click="showFollowingList()"
      >
        <span>Following ({{ following_count }})</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.user = this.$root.user;
    this.followers_count = this.user.followers.length;
    this.following_count = this.user.following.length;
  },
  name: "Followage",
  props: [
    "showFollowingList",
    "showFollowersList",
    "followersCount",
    "followingCount"
  ],
  data() {
    return {
      user: {},
      followers_count: 0,
      following_count: 0
    };
  },
  methods: {}
};
</script>

<style scoped>
.followage .field {
  margin: 1em;
}
</style>
