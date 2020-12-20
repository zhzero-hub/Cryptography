import VUE from 'vue'
import Vuex from 'vuex'
const BigInteger = require('biginteger').BigInteger;

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
        knapsackItems: [{
            index: '1',
            title: '素数管理',
            path: '/primeManage'
        }, {
            index: '2',
            title: '私钥管理',
            path: '/secretKeyManage'
        }, /*{
            index: '2',
            title: '公钥管理',
            path: '/publicKeyManage'
        },*/
        ],
        publicKey: [295, 592, 301, 14, 28, 353, 120, 236],
        usedPublicKey: [],
        secretKey: [BigInteger(2) , BigInteger(7) , BigInteger(11) , BigInteger(21) ,
        BigInteger(42) , BigInteger(89) , BigInteger(180) , BigInteger(354)],
        usedSecretKey: [],
        k: BigInteger(881),
        t: BigInteger(588),
        n: 2,
        encodedMessage: '',
        decodedMessage: ''
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
