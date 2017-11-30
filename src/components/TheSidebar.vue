<template>
  <div>
      <md-toolbar 
        class="md-transparent" 
        md-elevation="0"
      >
        Navigation
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Home</span>
        </md-list-item>

        <md-list-item>
          <md-icon>help</md-icon>
          <span class="md-list-item-text">About</span>
        </md-list-item>

        <md-list-item>
          <md-icon>event</md-icon>
          <span class="md-list-item-text">Event</span>
        </md-list-item>

        <md-list-item>
          <md-icon>group_add</md-icon>
          <span class="md-list-item-text">Join</span>
        </md-list-item>

        <md-list-item>
          <md-icon>chat</md-icon>
          <span class="md-list-item-text">Twitter</span>
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

</style>