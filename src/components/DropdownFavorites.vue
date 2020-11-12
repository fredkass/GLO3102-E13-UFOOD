<template>
  <b-dropdown aria-role="list">
    <b-button
      class="button is-dark"
      type="button"
      slot="trigger"
      icon-left="plus"
    >
      Add to favorite
    </b-button>
    <b-dropdown-item
      v-for="favList in favoriteLists"
      :key="favList.id"
      aria-role="listitem"
      @click="addToListEvent(favList.id)"
    >
      {{ favList.name }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  props: ["favoriteLists", "addToListEvent"]
};
</script>
