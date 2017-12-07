<template>
  <div>

    <twitter-card expand />

  </div>
</template>

<script>
import TwitterCard from './TwitterCard.vue'

export default {
  components: {
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
