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
            <b-checkbox-button v-model="checkboxPriceGroup" native-value="1">
              $
            </b-checkbox-button>
            <b-checkbox-button v-model="checkboxPriceGroup" native-value="2">
              $$
            </b-checkbox-button>
            <b-checkbox-button v-model="checkboxPriceGroup" native-value="3">
              $$$
            </b-checkbox-button>
            <b-checkbox-button v-model="checkboxPriceGroup" native-value="4">
              $$$$
            </b-checkbox-button>
            <b-checkbox-button v-model="checkboxPriceGroup" native-value="5">
              $$$$$
            </b-checkbox-button>
          </b-field>
        </b-menu-list>
        <b-menu-list label="Genre">
          <div class="field">
            <b-checkbox>Breafast</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox>Lunch</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox>Dinner</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox>Pizza</b-checkbox>
          </div>
          <div class="field">
            <b-checkbox>Asian</b-checkbox>
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
      checkboxPriceGroup: []
    };
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
