<template>
  <section>
    <b-field>
      <b-autocomplete
        :data="names"
        field="title"
        placeholder="Search restaurants..."
        :loading="false"
        @select="updateAndSearch"
        @typing="filterKeyPressed"
        v-model="searchFilter"
        :clearable="true"
        @keyup.native.enter="search"
      >
      </b-autocomplete>
      <b-button icon-left="search" type="is-primary" @click="search">
        Search
      </b-button>
    </b-field>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "SearchAutoComplete",
  props: ["names", "keypressed", "value", "search"],
  data() {
    return {
      data: [],
    };
  },
  methods: {
    filterKeyPressed: debounce(async function() {
      await this.keypressed();
    }, 500),
    async updateAndSearch(option) {
      this.searchFilter = option;
      await this.search();
    }
  },
  computed: {
    searchFilter: {
      get() {
        return this.value;
      },
      set(searchFilter) {
        this.$emit("input", searchFilter);
      }
    }
  }
};
</script>
<style scoped></style>
