import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//    引入页面组件
import Login from '../views/login/Login.vue'
import Notfound from '../views/404/Not-found.vue'
import Layout from '../views/layout/Index.vue'
import Chart from '../views/layout/chart/Index.vue'
import User from '../views/layout/user/Index.vue'
import Enterprise from '../views/layout/enterprise/Index.vue'
import Question from '../views/layout/question/Index.vue'
import Subject from '../views/layout/subject/Index.vue'

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/', redirect: '/login' },
    {
      path: '/layout', component: Layout, redirect: '/layout/chart', children: [
        { path: 'chart', component: Chart },
        { path: 'user', component: User },
        { path: 'enterprise', component: Enterprise },
        { path: 'question', component: Question },
        { path: 'subject', component: Subject },
      ]
    },
    { path: '*', component: Notfound }
  ]
})
import { getToken } from '../untils/token'
// 配置路由守卫
// 导航守卫
/**
 * 这个回调函数，在每次路由切换之前（无论是声明式导航，还是编程式导航）都会执行这个方法
 *
 * 参数1：to 表示你要去的路径
 * 参数2：from 你上一次的路径
 * 参数3：next 代表放行以及跳转指定的页面
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // 获取存在本地的token
    const token = getToken()
    if (token) {
      next()
    } else {
      next('/login')
    }
  }


})

export default router
