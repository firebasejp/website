<template>
  <template-card :expand-default="expandDefault">

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

<style scoped>

</style>
