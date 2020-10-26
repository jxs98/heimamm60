import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_BASEURL
import router from '../router/index'
//  携带cookie
axios.defaults.withCredentials = true
// 添加请求拦截器
// 获取用户信息需要携带token给后台,所以需要在请求拦截器中设置
import { getToken, removeToken } from '../untils/token'
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers.token = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  //  token错误就返回登录页面
  if (response.data.code === 206) {
    removeToken()
    router.push('/login')
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
})
Vue.prototype.$http = axios