<template>
  <template-card :expand-default="expandDefault">

    <div slot="title">
      Join
    </div>
    <div slot="summary">
      参加するには
    </div>
    <md-list slot="content">
      <md-list-item
        href="https://goo.gl/forms/HTpO1JucBx4pHbwe2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Slack
      </md-list-item>
      <md-list-item
        href="https://firebase-community.connpass.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="md-list-item-text"
      >
        Connpass 
      </md-list-item>
    </md-list>

  </template-card>
</template>

<script>
import TemplateCard from './TemplateCard.vue'

export default {
  components: {
    TemplateCard
  },
  props: ['expandDefault']

}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(orange, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent and secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

.md-list-item-link{
  color: #ff5252 !important;
}
</style>
