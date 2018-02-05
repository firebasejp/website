<template>
  <template-card :expand="expand">

    <div slot="title">
      Join
    </div>
    <div slot="summary">
      参加するには
    </div>
    <md-list slot="content">
      <md-list-item
        href="https://join.slack.com/t/firebase-jp/shared_invite/enQtMzA5NzcxNjIxNDc0LTlmODJjNzc1ZjA1OTFhYWE4NDg3Yzc2N2I3M2FmMTE0OTUyNGJlYTI5MDAxNGJhNDUwZGY0MzJkMmYwOGFhZjU"
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
  props: ['expand']

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
