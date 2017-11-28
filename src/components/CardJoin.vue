<template>
  <div>

    <md-card-header>
      <div class="md-title">Join</div>
    </md-card-header>
    <md-card-content>
      <ul>
        <li><a href="https://goo.gl/forms/HTpO1JucBx4pHbwe2" target="_blank" rel="noopener noreferrer">Slack</a></li>
      </ul>
    </md-card-content>

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