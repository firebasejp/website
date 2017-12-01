import CardAbout from './components/CardAbout.vue'
import CardEvents from './components/CardEvents.vue'
import CardJoin from './components/CardJoin.vue'
import CardTwitter from './components/CardTwitter.vue'
import PageHome from './components/PageHome.vue'

export default [
  {
    path: '/about',
    name: 'about',
    component: CardAbout
  },
  {
    path: '/events',
    name: 'events',
    component: CardEvents
  },
  {
    path: '/join',
    name: 'join',
    component: CardJoin
  },
  {
    path: '/twitter',
    name: 'twitter',
    component: CardTwitter
  },
  {
    path: '*',
    name: 'home',
    component: PageHome
  }
]
