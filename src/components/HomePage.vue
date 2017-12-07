<template>
  <div>

    <events-card expand />
    <twitter-card expand />
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
@media (min-width: 600px) {
  .md-card{
    width: 320px;
    display: block;
    float: left;
  }
}
</style>
