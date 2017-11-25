<template>
  <div id="app">

<div class="page-container">
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">FireJpUG</span>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible">
      <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

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

    <md-app-content>
    <h1>{{ msg }}</h1>
    <h2>About</h2>
    <pre>
      Firebase Japan User GroupはFirebase の User Groupです。
      Firebase初心者もガチ勢も誰でも参加できます！
      私たちはFirebaseを広く使われることを目標に活動しています。
    </pre>
    <h2>Event</h2>
    <ul>
      <li v-for="v in events" :key="v.link"><a :href="v.link" target="_blank" rel="noopener noreferrer">{{v.title}}</a></li>
    </ul>
    <h2>Join</h2>
    <ul>
      <li><a href="https://goo.gl/forms/HTpO1JucBx4pHbwe2" target="_blank" rel="noopener noreferrer">Slack</a></li>
    </ul>
    </md-app-content>
  </md-app>
</div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      menuVisible: false,
      msg: 'Firebase Japan User Group へ ようこそ！',
      events: [
        {
          title: 'Firebase Japan User Group / kickoff meeting',
          link: 'https://firebase-community.connpass.com/event/71102/',
          description: 'Firebaseのユーザーグループ作ります。 その最初のミーティングです。',
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(orange, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent and secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.md-app {
  border: 1px solid rgba(#000, .12);
}
</style>
