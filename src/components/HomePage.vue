<template>
  <div>

    <events-card expand-default="on" />
    <twitter-card expand-default="on" />
    <join-card />
    <about-card />

  </div>
</template>

<script>
import AboutCard from './AboutCard.vue'
import EventsCard from './EventsCard.vue'
import JoinCard from './JoinCard.vue'
import TwitterCard from './TwitterCard.vue'

export default {
  components: {
    AboutCard,
    EventsCard,
    JoinCard,
    TwitterCard
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
