import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routes from './routes.js'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import VueJsonp from 'vue-jsonp'

import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueJsonp)

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(VueAnalytics, {
  id: 'UA-52147387-7',
  router,
  debug: process.env.NODE_ENV === 'production' ? false : {
    enabled: true,
    trace: false,
    sendHitTask: true
  }
})

const vm = new Vue({
  router,
  render: h => h(App)
})

vm.$mount('#app')
