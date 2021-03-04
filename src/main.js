import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)
import App from './App.vue'
// import env from './env'

//mock开关
const mock = true;
//import是预编译加载，所以使用require
if (mock) {
  require('./mock/api')
}

axios.defaults.baseURL = '/api'

//fastmock模拟接口
// axios.defaults.baseURL = 'https://www.fastmock.site/mock/87ab1f31a8021b71b7e6b696cf9c8dee/mall'
axios.defaults.timeout = 8000;
// //根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL

//接口错误拦截
axios.interceptors.response.use(function (response) {
  const res = response.data;
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    window.location.href = '/#/login'
  } else {
    alert(res.message)
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')