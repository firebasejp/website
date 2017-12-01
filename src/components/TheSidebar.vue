<template>
  <div>
      <md-toolbar
        class="md-transparent"
        md-elevation="2"
      >
        <img
          class="fjug-logo"
          src="../img/FJUG.png"
          width="180"
        >
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>home</md-icon>
          <router-link
            to="/"
            class="md-list-item-text"
          >
            Home
          </router-link>
        </md-list-item>

        <md-list-item>
          <md-icon>help</md-icon>
          <router-link
            to="about"
            class="md-list-item-text"
          >
            About
          </router-link>
        </md-list-item>

        <md-list-item>
          <md-icon>event</md-icon>
          <router-link
            to="events"
            class="md-list-item-text"
          >
            Events
          </router-link>
        </md-list-item>

        <md-list-item>
          <md-icon>group_add</md-icon>
          <router-link
            to="join"
            class="md-list-item-text"
          >
            Join
          </router-link>
        </md-list-item>

        <md-list-item>
          <md-icon>chat</md-icon>
          <router-link
            to="twitter"
            class="md-list-item-text"
          >
            Twitter
          </router-link>
        </md-list-item>
      </md-list>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(orange, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent and secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

.fjug-logo {
  margin: 30px auto;
}
</style>
