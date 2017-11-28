<template>
  <div>

    <md-card-header>
      <div class="md-title">Event</div>
    </md-card-header>
    <md-card-content>
      <ul>
        <li v-for="v in events" :key="v.link"><a :href="v.link" target="_blank" rel="noopener noreferrer">{{v.title}}</a></li>
      </ul>
    </md-card-content>

  </div>
</template>

<script>
  export default {
  data () {
    return {
      events: [
        {
          title: 'Firebase Japan User Group / kickoff meeting',
          link: 'https://firebase-community.connpass.com/event/71102/',
          description: 'Firebaseのユーザーグループ作ります。 その最初のミーティングです。',
        },
      ]
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