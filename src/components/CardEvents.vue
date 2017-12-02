<template>
  <md-card ref="card">
    <template-card>

      <div slot="title">
        Events
      </div>
      <div slot="summary">
        開催イベント
      </div>
      <div slot="content">
        <md-card
            v-for="v in events"
            :key="v.link"
            md-with-hover
        >
          <md-ripple>
            <a
                :href="v.link"
                target="_blank"
                rel="noopener noreferrer"
                >
            <md-card-header>
              <div class="md-title">{{v.title}}</div>
            </md-card-header>
            </a>

            <md-card-actions>
              <md-button
                :href="v.link"
                target="_blank"
                rel="noopener noreferrer"
                class="md-raised md-primary"
              >
                参加する
              </md-button>
            </md-card-actions>

            <md-card-content>
              {{v.description}}
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>

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
  },
  data () {
    return {
      events: [
        {
          title: 'Firebase Japan User Group / meetup / 1',
          link: 'https://firebase-community.connpass.com/event/72939/',
          description: 'Firebase Japan User Group(FJUG)のmeetupです。 私たちはFirebaseに興味のあるどんな方でも歓迎しています。\n\n今回はFirebaseについて詳しい方に話してもらいます。\n\n質問などありましたらセッション後の質問やセッション中に https://firebase.asia/ から FJUGのSlackに入り #meetup で質問してみてください。'},
        {
          title: 'Firebase Japan User Group / kickoff meeting',
          link: 'https://firebase-community.connpass.com/event/71102/',
          description: 'Firebaseのユーザーグループ作ります。 その最初のミーティングです。'
        }
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

.md-card {
  margin: 4px;
}
.md-list-item-link{
  color: #ff5252 !important;
}
</style>
