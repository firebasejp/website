<template>
  <md-card ref="card">
    <template-card>

      <div slot="title">
        Join
      </div>
      <div slot="summary">
        参加するには
      </div>
      <ul slot="content">
        <li>
          <a
            href="https://goo.gl/forms/HTpO1JucBx4pHbwe2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Slack
          </a>
        </li>
      </ul>

    </template-card>
  </md-card>
</template>

<script>
import TemplateCard from './TemplateCard.vue'

export default {
  components: {
    TemplateCard
  },
  props: ['expandDefault'],
  mounted: function () {
    if (this.expandDefault === 'on') {
      this.$refs.card.$data.MdCard.expand = true
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