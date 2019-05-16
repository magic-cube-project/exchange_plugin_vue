import Vue from 'vue'
import Router from 'vue-router'
import Market from '@/view/market'
import Help from '@/view/help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/market',
      component: Market
    },
    {
      path: '/',
      redirect: '/market'
    },
    {
      path: '/help',
      component: Help
    },
  ]
})
