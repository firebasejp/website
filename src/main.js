import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routes from './routes.js'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
