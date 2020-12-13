<template>
<!--  //TODO INTÉGRER LE CHAMP DANS LES ENDROITS ACTUELS-->
<!--  //TODO IMPORTER LA LISTE D'ÉLÉMENTS (EX. RESTAURANTS.NAME POUR L'ARRAY ITEMS-->
<!--  //TODO AJOUTER FONCTION QUI FAIT DISPARAÎTRE LA LISTE LORSQU'ON CLIC EN DEHORS-->
<!--  //TODO COPIER LE STYLE CSS DÉJÀ UTILISÉ, PRÉSENTEMENT STYLE BIDON-->
  <div class="autocomplete">
    <input
      type="text"
      v-model="search"
      @input="onChange"
    />

    <ul v-show="isOpen"
      class="autocomplete-results">
      <li
        class="loading"
        v-if="isLoading">Awaiting results...
      </li>
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        >
        {{ result }}
      </li>
    </ul>
  </div>
</template>


<script>
export default {
name: "SearchAutoComplete",
  props: {
  items: {
    type: Array,
    required: false,
    default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
  return {
    search: '',
    results: [],
    isOpen: false,
    };
  },
  methods: {
    onChange() {
      this.$emit('input', this.search);
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },
    filterResults() {
      this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
    },
  },
  watch: {
  items: function (value, oldValue) {
    if (this.isAsync) {
      this.results = value;
      this.isOpen = true;
      this.isLoading = false;
    }
  }
  }
};
</script>

<style scoped>
.autocomplete {
  position: relative;
  width: 130px;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}

</style>
