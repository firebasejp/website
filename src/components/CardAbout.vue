<template>
  <md-card ref="card">
    <template-card>

      <div slot="title">
        About
      </div>
      <div slot="summary">
        このグループについて
      </div>
      <p slot="content">
        Firebase Japan User GroupはFirebase の User Groupです。<br/>
        Firebase初心者もガチ勢も誰でも参加できます！<br/>
        私たちはFirebaseを広く使われることを目標に活動しています。<br/>
      </p>

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

<style scoped>

</style>
