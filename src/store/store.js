import VUE from 'vue'
import Vuex from 'vuex'
const BigInteger = require('biginteger').BigInteger;
//const bindings = require('bindings')('addon.node')

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
                        path: '/primeManage',
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
        publicKey: [],
        usedPublicKey: [],
        secretKey: [{
            key: BigInteger(1),
            used: true
        }, {
            key: BigInteger(3),
            used: true
        },  {
            key: BigInteger(5),
            used: true
        }, {
            key: BigInteger(11),
            used: true
        }, {
            key: BigInteger(21),
            used: true
        }, {
            key: BigInteger(44),
            used: true
        }, {
            key: BigInteger(87),
            used: true
        }, {
            key: BigInteger(175),
            used: true
        }, {
            key: BigInteger(349),
            used: true
        }, {
            key: BigInteger(701),
            used: true
        }, {
            key: BigInteger(1403),
            used: true
        }, {
            key: BigInteger(2807),
            used: true
        }, {
            key: BigInteger(5615),
            used: true
        }, {
            key: BigInteger(11231),
            used: true
        }, {
            key: BigInteger(22463),
            used: true
        }, {
            key: BigInteger(44927),
            used: true
        }, {
            key: BigInteger(89855),
            used: true
        }, {
            key: BigInteger(179711),
            used: true
        }, {
            key: BigInteger(359423),
            used: true
        }, {
            key: BigInteger(718847),
            used: true
        }],
        usedSecretKey: [],
        k: BigInteger(1437697),
        t: BigInteger(43),
        n: 2,
        encodedMessage: '',
        decodedMessage: ''
    },
    mutations: {
        setBarCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        hello() {
            //bindings.hello()
        }
    },
    actions: {

    },
    getters: {

    }
})
