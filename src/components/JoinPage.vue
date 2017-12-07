<template>
  <div>

    <join-card expand />

  </div>
</template>

<script>
import JoinCard from './JoinCard.vue'

export default {
  components: {
    JoinCard
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
