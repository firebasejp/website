import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routes from './routes.js'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter)
Vue.use(VueMaterial)

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(VueAnalytics, {
  id: 'UA-52147387-7',
  router
})

const vm = new Vue({
  router,
  render: h => h(App)
})

vm.$mount('#app')
