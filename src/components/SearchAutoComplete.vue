<template>
  <section>
    <p class="content"><b>Selected:</b> {{ selected }}</p>
    <b-field label="Find a movie">
      <b-autocomplete
        :data="data"
        placeholder="e.g. Fight Club"
        field="title"
        :loading="isFetching"
        @select="option => (selected = option)"
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
  props: [restaurants],
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
