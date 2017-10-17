<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <h2>About</h2>
    <pre>
      Firebase Japan User GroupはFirebase の User Groupです。
      Firebase初心者もガチ勢も誰でも参加できます！
      私たちはFirebaseを広く使われることを目標に活動しています。
    </pre>
    <h2>Event</h2>
    <ul>
      <li>TBD</li>
    </ul>
    <h2>Join</h2>
    <ul>
      <li>TBD</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Firebase Japan User Group へ ようこそ！'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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

a {
  color: #42b983;
}
</style>
