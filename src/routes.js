import AboutPage from './components/AboutPage.vue'
import EventsPage from './components/EventsPage.vue'
import JoinPage from './components/JoinPage.vue'
import TwitterPage from './components/TwitterPage.vue'
import HomePage from './components/HomePage.vue'

export default [
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/events',
    name: 'events',
    component: EventsPage
  },
  {
    path: '/join',
    name: 'join',
    component: JoinPage
  },
  {
    path: '/twitter',
    name: 'twitter',
    component: TwitterPage
  },
  {
    path: '*',
    component: HomePage
  }
]
