<template>
  <template-card :expand="expand">

    <div slot="title">
      Events
    </div>
    <div slot="summary">
      開催イベント
    </div>
    <div slot="content">
      <md-card
          v-for="v in events"
          :key="v.event_url"
          md-with-hover
      >
        <md-ripple>
          <md-card-header>
            <a
                :href="v.event_url"
                target="_blank"
                rel="noopener noreferrer"
                >
              <h2 class="md-title">{{v.title}}</h2>
            </a>
            <div class="md-subhead">
              <md-icon>event</md-icon>
              <span>{{v.started_at | moment}}</span>
            </div>
            <div class="md-subhead">
              <md-icon>place</md-icon>
              <span>{{v.place}}</span>
            </div>
          </md-card-header>

          <md-card-actions>
            <md-button
              :href="v.event_url"
              target="_blank"
              rel="noopener noreferrer"
              class="md-raised md-primary"
            >
              参加する
            </md-button>
          </md-card-actions>

          <md-card-content v-if="v.catch">
            {{v.catch}}
          </md-card-content>
        </md-ripple>
      </md-card>
    </div>

  </template-card>
</template>

<script>
import moment from 'moment'
import TemplateCard from './TemplateCard.vue'

export default {
  components: {
    TemplateCard
  },
  props: ['expand'],
  filters: {
    moment: function (date) {
      return moment(date).format('YYYY/MM/DD HH:mm')
    }
  },
  data () {
    return {
      events: []
    }
  },
  mounted() {
    this.$jsonp('https://connpass.com/api/v1/event/', { series_id: 4070 }).then(res => {
      this.events = res.events
    }).catch(err => {
      console.error(err)
    })
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
