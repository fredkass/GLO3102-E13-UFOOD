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
          <div class="field">
            <b-checkbox
              v-model="genresCheckbox"
              native-value="hamburgers"
              @input="onGenresChange"
              >Hamburgers</b-checkbox
            >
          </div>
          <div class="field">
            <b-checkbox
              v-model="genresCheckbox"
              native-value="fast-food"
              @input="onGenresChange"
              >Fast-Food</b-checkbox
            >
          </div>
          <div class="field">
            <b-checkbox
              v-model="genresCheckbox"
              native-value="desserts"
              @input="onGenresChange"
              >Desserts</b-checkbox
            >
          </div>
          <div class="field">
            <b-checkbox
              v-model="genresCheckbox"
              native-value="libanais"
              @input="onGenresChange"
              >Libanais</b-checkbox
            >
          </div>
          <div class="field">
            <b-checkbox
              v-model="genresCheckbox"
              native-value="asiatique"
              @input="onGenresChange"
              >Asian</b-checkbox
            >
          </div>
          <a>See all</a>
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
      genresCheckbox: []
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
