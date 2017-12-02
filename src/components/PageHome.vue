<template>
  <div>

    <card-events expand-default="on" />
    <card-twitter expand-default="on" />
    <card-join />
    <card-about />

  </div>
</template>

<script>
import CardAbout from './CardAbout.vue'
import CardEvents from './CardEvents.vue'
import CardJoin from './CardJoin.vue'
import CardTwitter from './CardTwitter.vue'

export default {
  components: {
    CardAbout,
    CardEvents,
    CardJoin,
    CardTwitter
  }
}
</script>

<style scoped>
.md-card {
  margin: 4px;
}

@media (min-width: 600px) {
  .md-card{
    width: 320px;
    display: block;
    float: left;
  }
}
</style>
