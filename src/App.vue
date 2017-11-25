<template>
  <div id="app">

<div class="page-container">
  <md-app md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <md-button class="md-icon-button menu-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">FireJpUG</span>
    </md-app-toolbar>

    <md-app-drawer md-permanent="full" :md-active.sync="menuVisible">
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
    
    <md-card>
      <md-card-header>
        <div class="md-title">About</div>
      </md-card-header>
      <md-card-content>
        <p>
          Firebase Japan User GroupはFirebase の User Groupです。<br/>
          Firebase初心者もガチ勢も誰でも参加できます！<br/>
          私たちはFirebaseを広く使われることを目標に活動しています。<br/>
        </p>
      </md-card-content>
    </md-card>

    <md-card>
      <md-card-header>
        <div class="md-title">Event</div>
      </md-card-header>
      <md-card-content>
        <ul>
          <li v-for="v in events" :key="v.link"><a :href="v.link" target="_blank" rel="noopener noreferrer">{{v.title}}</a></li>
        </ul>
      </md-card-content>
    </md-card>

    <md-card>
      <md-card-header>
        <div class="md-title">Join</div>
      </md-card-header>
      <md-card-content>
        <ul>
          <li><a href="https://goo.gl/forms/HTpO1JucBx4pHbwe2" target="_blank" rel="noopener noreferrer">Slack</a></li>
        </ul>
      </md-card-content>
    </md-card>

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
}

h1, h2 {
  font-weight: normal;
  line-height: 1em;
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
  max-height: 100vh;
  border: 1px solid rgba(#000, .12);
}


.md-app-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-card {
  margin: 4px;
}

@media (min-width: 600px) {
  .menu-button {
    display: none;
  }

  .md-card{
    width: 320px;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
