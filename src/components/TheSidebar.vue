<template>
  <div>
      <md-toolbar
        class="md-transparent"
        md-elevation="2"
      >
        <img
          src="../assets/logo.png"
          alt="Firebase Japan User Group"
          width="180"
          class="fjug-logo"
        >
      </md-toolbar>

      <md-list>
        <md-list-item to="/">
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Home</span>
        </md-list-item>

        <md-list-item to="about">
          <md-icon>help</md-icon>
          <span class="md-list-item-text">About</span>
        </md-list-item>

        <md-list-item to="events">
          <md-icon>event</md-icon>
          <span class="md-list-item-text">Events</span>
        </md-list-item>

        <md-list-item to="join">
          <md-icon>group_add</md-icon>
          <span class="md-list-item-text">Join</span>
        </md-list-item>

        <md-list-item to="twitter">
          <md-icon>chat</md-icon>
          <span class="md-list-item-text">Twitter</span>
        </md-list-item>

        <md-list-item
            href="https://medium.com/firebase-japan-user-group"
            target="_blank"
            rel="noopener noreferrer"
        >
          <md-icon>note</md-icon>
          <span class="md-list-item-text">Blog</span>
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

.md-list-item-text{
  color: #ff5252 !important;
}
</style>
