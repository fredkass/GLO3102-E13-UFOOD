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
          <div class="buttons has-addons">
            <button class="button">$</button>
            <button class="button is-info is-selected">$$</button>
            <button class="button">$$$</button>
            <button class="button">$$$$</button>
            <button class="button">$$$$$</button>
          </div>
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
      open: true
    };
  }
};
</script>

<style lang="scss">
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
  // min-height: 100vh;
}
.sidebar-content {
  padding: 1em;
}
.b-sidebar{
  width:100%;
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
