<template>
  <div class="user-box">
    <div class="box" v-if="!isLoaded">
      <div class="columns is-mobile">
        <div class="column is-one-third">
          <b-carousel :autoplay="false" :indicator="false"> </b-carousel>
        </div>
        <div class="column">
          <h5 class="title is-5">
            <b-skeleton :animated="true"></b-skeleton>
          </h5>
          <b-skeleton :animated="true"></b-skeleton>
          <b-skeleton :animated="true"></b-skeleton>
          <b-skeleton :animated="true"></b-skeleton>
          <b-skeleton :animated="true"></b-skeleton>
          <b-skeleton :animated="true"></b-skeleton>
        </div>
      </div>
    </div>

    <div class="box" v-if="isLoaded">
      <div class="columns">
        <div class="column">
          <h5 class="title is-5">
            <router-link :to="'/userview/' + user.id">{{
              user.name
            }}</router-link>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserCard",
  props: ["user"],
  data() {
    return {
      isLoaded: true
    };
  },
  isLoaded: true
};
</script>
<style scoped>
.box:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.box {
  height: 100%;
  min-width: 300px;
}
</style>
