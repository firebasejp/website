<template>
  <div>

    <md-card-header>
      <div class="md-title">
        <slot name="title"></slot>
      </div>
      <div class="md-subhead">
        <slot name="subtitle"></slot>
      </div>
    </md-card-header>

    <md-card-content>
      <slot name="summary"></slot>
    </md-card-content>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">

          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            <slot name="content"></slot>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>

  </div>
</template>

<script>
export default {
  data () {
    return {
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

</style>
