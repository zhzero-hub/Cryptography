import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
      {
          path: '/',
          name: 'home', //主界面
          component: () => import('@/components/index')
      },
      {
          path: '/knapsack',
          name: 'knapsack',
          component: () => import('@/components/knapsack')
      }
    ]
})

export default router
