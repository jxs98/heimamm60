import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//    引入页面组件
import Login from '../views/login/Login.vue'

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' }
  ]
})

export default router
