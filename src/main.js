// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from './companyImport'

import axios from 'axios'
import echarts from 'echarts'


Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
axios.defaults.timeout = 50000;
// Vue.prototype.global = "http://119.3.255.22:8041";
Vue.prototype.global = "http://192.168.1.182:8041";
// Vue.prototype.global = "http://127.0.0.1:8041";

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
