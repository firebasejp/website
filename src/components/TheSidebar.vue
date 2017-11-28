<template>
  <div>
    <md-app-drawer
      md-permanent="full"
      :md-active.sync="menuVisible"
    >
      <md-toolbar 
        class="md-transparent" 
        md-elevation="0"
      >
        Navigation
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Home</span>
        </md-list-item>

        <md-list-item>
          <md-icon>help</md-icon>
          <span class="md-list-item-text">About</span>
        </md-list-item>

        <md-list-item>
          <md-icon>event</md-icon>
          <span class="md-list-item-text">Event</span>
        </md-list-item>

        <md-list-item>
          <md-icon>group_add</md-icon>
          <span class="md-list-item-text">Join</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.md-app-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>