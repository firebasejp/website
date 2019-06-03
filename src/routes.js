export default [
  {
    path: '/about',
    name: 'about',
    component: () => import('./components/AboutPage.vue')
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('./components/EventsPage.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('./components/JoinPage.vue')
  },
  {
    path: '*',
    component: () => import('./components/HomePage.vue')
  }
]
