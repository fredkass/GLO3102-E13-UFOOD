<template>
  <section>
    <b-field>
      <b-autocomplete
        :data="names"
        field="title"
        placeholder="Search..."
        :loading="false"
        @select="option => (selected = option)"
        v-model="searchFilter"
        @typing="keypressed"
      >
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
export default {
  name: "SearchAutoComplete",
  props: ["names", "keypressed", "value"],
  data() {
    return {
      data: [],
      selected: null,
    };
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

