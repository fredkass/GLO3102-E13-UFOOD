<template>
  <section class="sidebar-layout">
    <b-sidebar
      position="static"
      :fullwidth="true"
      :fullheight="true"
      v-model="open"
    >
      <b-menu class="is-custom-mobile">
        <b-menu-list label="Filters">
          <b-field>
            <b-checkbox-button
              v-model="checkboxPriceGroup"
              native-value="1"
              @input="onPriceChange"
            >
              $
            </b-checkbox-button>
            <b-checkbox-button
              v-model="checkboxPriceGroup"
              native-value="2"
              @input="onPriceChange"
            >
              $$
            </b-checkbox-button>
            <b-checkbox-button
              v-model="checkboxPriceGroup"
              native-value="3"
              @input="onPriceChange"
            >
              $$$
            </b-checkbox-button>
            <b-checkbox-button
              v-model="checkboxPriceGroup"
              native-value="4"
              @input="onPriceChange"
            >
              $$$$
            </b-checkbox-button>
            <b-checkbox-button
              v-model="checkboxPriceGroup"
              native-value="5"
              @input="onPriceChange"
            >
              $$$$$
            </b-checkbox-button>
          </b-field>
        </b-menu-list>
        <b-menu-list label="Genre">
          <div class="field" v-for="genre in genresList" :key="genre.native">
            <b-checkbox
              v-model="genresCheckbox"
              :native-value="genre.native"
              @input="onGenresChange"
              >{{ genre.name }}</b-checkbox
            >
          </div>
        </b-menu-list>
      </b-menu>
    </b-sidebar>
  </section>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: true,
      mobile: "hide",
      reduce: false,
      open: true,
      checkboxPriceGroup: [],
      genresCheckbox: [],
      genresList: [
        {
          native: "végétarien",
          name: "Vegetarian"
        },
        {
          native: "santé",
          name: "Healthy"
        },
        {
          native: "italien",
          name: "Italian"
        },
        {
          native: "asiatique",
          name: "Asian"
        },
        {
          native: "mexicain",
          name: "Mexican"
        },
        {
          native: "libanais",
          name: "Lebanese"
        },
        {
          native: "bistro",
          name: "Bistro"
        },
        {
          native: "pizzeria",
          name: "Pizza"
        },
        {
          native: "fast-food",
          name: "Fast-Food"
        },
        {
          native: "hamburgers",
          name: "Hamburgers"
        },
        {
          native: "fruits de mer",
          name: "Fish"
        },
        {
          native: "happy hour",
          name: "Happy hour"
        },
        {
          native: "ambiance",
          name: "Ambiance"
        },
        {
          native: "européen",
          name: "European"
        },
        {
          native: "café",
          name: "Café"
        },
        {
          native: "desserts",
          name: "Desserts"
        }
      ]
    };
  },
  methods: {
    onPriceChange() {
      this.$emit("updatePrice", this.checkboxPriceGroup);
    },
    onGenresChange() {
      this.$emit("updateGenre", this.genresCheckbox);
    }
  }
};
</script>

<style lang="scss">
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
}
.sidebar-content {
  padding: 1em;
}
.b-sidebar {
  width: 100%;
}
</style>
