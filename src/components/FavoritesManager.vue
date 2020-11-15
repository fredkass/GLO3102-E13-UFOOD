<template>
  <div class="favorites-manager">
    <b-dropdown aria-role="list">
      <button class="button is-primary" slot="trigger">
        <span>Delete a list</span>
      </button>
      <b-dropdown-item
        v-for="favList in favoritesLists"
        :key="favList.id"
        aria-role="listitem"
        @click="deleteSelectedList(favList.id)"
      >
        {{ favList.name }}
      </b-dropdown-item>
    </b-dropdown>
    <b-button class="button is-primary" slot="trigger">
      <span>Create new list</span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "FavoritesManager",
  props: ["favoritesLists", "userId", "deleteSelectedList"],
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped></style>
