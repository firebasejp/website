<template>
  <div id="app">

    <div class="page-container">
      <md-app md-mode="fixed">
        <md-app-toolbar class="md-primary">
          <the-topbar
            slot="md-app-toolbar"
            @switchSidebarVisibleEmit='menuVisible = !menuVisible'
          >
          </the-topbar>
        </md-app-toolbar>

        <md-app-drawer
          md-permanent="full"
          :md-active.sync="menuVisible"
        >
          <the-sidebar />
        </md-app-drawer>

        <md-app-content>
          <h1>{{ msg }}</h1>
          <router-view />

        </md-app-content>
      </md-app>
    </div>

  </div>
</template>

<script>
import TheSidebar from "./components/TheSidebar.vue";
import TheTopbar from "./components/TheTopbar.vue";

export default {
  name: "app",
  components: {
    TheTopbar,
    TheSidebar
  },
  data() {
    return {
      menuVisible: false,
      msg: 'Firebase Japan User Group へ ようこそ！'
    }
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      this.menuVisible = false
      next()
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(orange, A200), 
  accent: md-get-palette-color(red, A200) 
));

@import "~vue-material/dist/theme/all"; // Apply the theme

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app,
.page-container,
main {
  height: 100%;
}

h1,
h2 {
  font-weight: normal;
  line-height: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.md-app {
  max-height: 100vh;
  border: 1px solid rgba(#000, 0.12);
  height: 100%;
}

.md-app-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-card {
  margin: 4px;
}
</style>
