import VUE from 'vue'
import Vuex from 'vuex'

VUE.use(Vuex)

export default new Vuex.Store({
    state: {
        isCollapse: false, //菜单栏左右滑动标志
        menu: [
            {
                index: '1',
                title: ' 背包密码体制',
                icon: 'el-icon-shopping-bag-1',
                content: [
                    {
                        item: '背包密码体制介绍',
                        path: '/',
                    },
                    {
                        item: '展示',
                        path: '/knapsack',
                    }
                ],
            },
            {
                index: '2',
                title: ' Rabin密码体制',
                icon: 'el-icon-position',
                content: [
                    {
                        item: 'Rabin密码体制介绍',
                        path: '/',
                    },
                    {
                        item: '展示',
                        path: '/rabin',
                    }
                ],
            },
        ],
    },
    mutations: {
        setBarCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {

    },
    getters: {

    }
})
