<!--<template>-->
<!--  <section>-->
<!--    <b-field grouped group-multiline>-->
<!--      <div class="control">-->
<!--        <b-switch v-model="openOnFocus">-->
<!--          Open dropdown on focus-->
<!--        </b-switch>-->
<!--      </div>-->
<!--      <div class="control">-->
<!--        <b-switch v-model="keepFirst">-->
<!--          Keep-first-->
<!--          <small>(will always have first option pre-selected)</small>-->
<!--        </b-switch>-->
<!--      </div>-->
<!--      <div class="control">-->
<!--        <b-switch v-model="clearable">-->
<!--          Clearable-->
<!--        </b-switch>-->
<!--      </div>-->
<!--    </b-field>-->
<!--    <p class="content"><b>Selected:</b> {{ selected }}</p>-->
<!--    <b-field label="Find a name">-->
<!--      <b-autocomplete-->
<!--        v-model="Restaurant"-->
<!--        placeholder="Search restaurants..."-->
<!--        :keep-first="keepFirst"-->
<!--        :open-on-focus="openOnFocus"-->
<!--        :data="filteredDataObj"-->
<!--        field="user.first_name"-->
<!--        @select="option => (selected = option)"-->
<!--        :clearable="clearable"-->
<!--      >-->
<!--      </b-autocomplete>-->
<!--    </b-field>-->
<!--  </section>-->
<!--</template>-->

<!--<script>-->
<!--//const restaurants = require('@/data/sample.json')-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      data: [],-->
<!--      keepFirst: false,-->
<!--      openOnFocus: false,-->
<!--      name: "SearchAutoComplete",-->
<!--      selected: null,-->
<!--      clearable: false-->
<!--    }-->
<!--  },-->
<!--  props: ["restaurants"],-->
<!--  computed: {-->
<!--    filteredDataObj() {-->
<!--      return this.restaurants.filter(option => {-->
<!--        return (-->
<!--          option.restaurants.items.name-->
<!--            .toString()-->
<!--            .toLowerCase()-->
<!--            .indexOf(this.name.toLowerCase()) >= 0-->
<!--        )-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<template>
  <section>
    <b-field>
      <b-autocomplete
        :data="data"
        field="title"
        placeholder="Search restaurants..."
        :loading="isFetching"
        v-on:change="searchFilter"
        @select="option => (selected = option)"
      >
        <template slot-scope="props">
          <div class="media">
            <div class="media-content">
              {{ props.restaurant.items.name }}
              <br />
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: "SearchAutoComplete",
  props: ["restaurants"],
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false
    };
  },
  methods: {
    searchFilter: debounce(function(name) {

      if (!name.length) {
        //TODO J'étais rendu à essayer d'utiliser le props de restaurant qui devrait être le json pour cette fonction
        this.data = [];
        return
      }
      this.isFetching = true
        .then(({ data }) => {
          this.data = []
          data.results.forEach((item) => this.data.push(item))
        })
        .catch((error) => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500)
  }
};
</script>
<style scoped></style>
