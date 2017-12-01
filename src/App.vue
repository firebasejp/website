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
          
          <card-about />
          <card-events />
          <card-join />
          <card-twitter />

        </md-app-content>
      </md-app>
    </div>

  </div>
</template>

<script>
import TheSidebar from './components/TheSidebar.vue'
import TheTopbar from './components/TheTopbar.vue'
import CardAbout from './components/CardAbout.vue'
import CardEvents from './components/CardEvents.vue'
import CardJoin from './components/CardJoin.vue'
import CardTwitter from './components/CardTwitter.vue'

export default {
  name: 'app',
  components: {
    TheTopbar,
    TheSidebar,
    CardAbout,
    CardEvents,
    CardJoin,
    CardTwitter
  },
  data () {
    return {
      menuVisible: false,
      msg: 'Firebase Japan User Group へ ようこそ！',
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(orange, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent and secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2 {
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
  border: 1px solid rgba(#000, .12);
}

.md-app-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-card {
  margin: 4px;
}

@media (min-width: 600px) {
  .md-card{
    width: 320px;
    display: block;
    float: left;
  }
}
</style>
