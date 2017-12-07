<template>
  <template-card :expand-default="expandDefault">

    <div slot="title">
      Twitter
    </div>
    <div slot="summary">
      関連ツイート
    </div>
    <a
      slot="content"
      class="twitter-timeline"
      href="https://twitter.com/search?q=Firebasejp%20OR%20FireJpUG%20OR%20FJUG"
      data-widget-id="936240584850731008"
    >
      Firebasejp OR FireJpUG OR FJUGに関するツイート
    </a>

  </template-card>
</template>

<script>
import TemplateCard from './TemplateCard.vue'
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs)}}(document,"script",'twitter-wjs')

export default {
  components: {
    TemplateCard
  },
  props: ['expandDefault']

}
</script>

<style scoped>

</style>
