import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home', //主界面
            component: () => import('@/components/index'),
            children: [{
                    path: '/knapsack',//背包密码体制
                    name: 'knapsack',
                    component: () => import('@/core/knapsack'),
                    children: [{
                       path: '/primeManage',
                       name: 'primeManage',
                       component: () => import('@/components/primeManage')
                    }, {
                        path: '/secretKeyManage',
                        name: 'secretKeyManage',
                        component: () => import('@/components/secretKeyManage')
                    }],
                }, {
                    path: 'introduction',
                    name: 'introduction',
                    component: () => import('@/core/introduction')
                }, {
                path: 'analysis',
                name: 'analysis',
                component: () => import('@/core/analysis')
            }
            ]
        }
    ]
})

export default router
