// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'

Vue.use(ElementUI)
Vue.use(router)

Vue.config.productionTip = false
Vue.prototype.bus = new Vue()
/* global BigInt */
axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = 'http://zhzero.top:7077/api/'
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})

BigInt.prototype.toJSON = function () {
  return this.toString()
}