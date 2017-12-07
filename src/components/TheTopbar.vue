<template>
  <div class="top-bar">
    <md-button
      class="md-icon-button menu-button"
      @click="switchSidebarVisible"
    >
      <md-icon>menu</md-icon>
    </md-button>
    <h1 class="md-title">Firebase Japan User Group</h1>

  </div>
</template>

<script>
export default {
  methods: {
    switchSidebarVisible () {
      this.$emit('switchSidebarVisibleEmit')
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

.top-bar{
  display: table;
}

.md-title{
  display: table-cell;
  vertical-align: middle;
  font-weight: bold;
}

@media (min-width: 600px) {
  .menu-button {
    display: none;
  }
}
</style>
