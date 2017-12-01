<template>
  <md-card>
    <template-card>

      <div slot="title">
        Events
      </div>
      <div slot="summary">
        開催イベント
      </div>
      <ul slot="content">
        <li 
          v-for="v in events" 
          :key="v.link"
        >
          <a 
            :href="v.link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {{v.title}}
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
  data () {
    return {
      events: [
        {
          title:"Firebase Japan User Group / meetup / 1",
          link:"https://firebase-community.connpass.com/event/72939/",
          description:"Firebase Japan User Group(FJUG)のmeetupです。 私たちはFirebaseに興味のあるどんな方でも歓迎しています。\n\n今回はFirebaseについて詳しい方に話してもらいます。\n\n質問などありましたらセッション後の質問やセッション中に https://firebase.asia/ から FJUGのSlackに入り #meetup で質問してみてください。"},
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