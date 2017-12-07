<template>
  <div>

    <about-card expand />

  </div>
</template>

<script>
import AboutCard from './AboutCard.vue'

export default {
  components: {
    AboutCard
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
