import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)
import App from './App.vue'

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000;
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