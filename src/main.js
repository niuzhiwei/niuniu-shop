import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios';
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Message
} from 'element-ui';

import App from './App.vue'
// import env from './env'

//mock开关
const mock = false;
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
  const path = location.hash
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    if (path !== '#/index') {
      window.location.href = '/#/login'
    }
    return Promise.reject(res);
  } else {
    Message.warning(res.message)
    return Promise.reject(res);
  }
})

Vue.prototype.$message = Message;
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: '/imgs/loading-svg/loading-bars.svg',
  attempt: 1
})
Vue.config.productionTip = false;


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')