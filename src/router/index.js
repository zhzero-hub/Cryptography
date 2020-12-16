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
          path: '/knapsack',//背包密码体制
          name: 'knapsack',
          component: () => import('@/core/knapsack')
      },
      {
          path: '/rabin',//rabin密码体制
          name: 'rabin',
          component: () => import('@/core/rabin')
      }
    ]
})

export default router
