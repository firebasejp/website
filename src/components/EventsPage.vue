<template>
  <div>

    <events-card expand-default="on" />

  </div>
</template>

<script>
import EventsCard from './EventsCard.vue'

export default {
  components: {
    EventsCard
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
