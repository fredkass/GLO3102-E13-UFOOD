<template>
  <div class="favorites-manager">
    <div class="field">
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
    </div>
    <b-field position="is-centered">
      <div class="control">
        <b-input
          type="text"
          v-model="new_list_name"
          placeholder="Create new list"
          expanded
        />
      </div>
      <div class="control">
        <b-button type="is-primary" @click="createNewList(new_list_name)">
          Create
        </b-button>
      </div>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "FavoritesManager",
  props: ["favoritesLists", "userId", "deleteSelectedList", "createNewList"],
  data() {
    return {
      new_list_name: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.favorites-manager .field {
  margin: 1em;
}
</style>
