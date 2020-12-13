<template>
  <section>
    <b-field>
      <b-autocomplete
        :data="data"
        placeholder="Search restaurants..."
        field="title"
        :loading="isFetching"
        @select="restaurant => (selected = restaurant)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-content">
              {{ props.restaurant.name }}
              <br />
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
export default {
  name: "SearchAutoComplete",
  props: ["restaurants"],
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false
    };
  }
};
</script>
<style scoped></style>
