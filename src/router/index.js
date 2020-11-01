import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//    引入页面组件
// import Login from '../views/login/Login.vue'
// import Notfound from '../views/404/Not-found.vue'
// import Layout from '../views/layout/Index.vue'
// import Chart from '../views/layout/chart/Index.vue'
// import User from '../views/layout/user/Index.vue'
// import Enterprise from '../views/layout/enterprise/Index.vue'
// import Question from '../views/layout/question/Index.vue'
// import Subject from '../views/layout/subject/Index.vue'
// import Welcome from '../views/layout/welcome/Index.vue'

const Login = () => import('../views/login/Login.vue')
const Notfound = () => import('../views/404/Not-found.vue')
const Layout = () => import('../views/layout/Index.vue')
const Chart = () => import('../views/layout/chart/Index.vue')
const User = () => import('../views/layout/user/Index.vue')
const Enterprise = () => import('../views/layout/enterprise/Index.vue')
const Question = () => import('../views/layout/question/Index.vue')
const Subject = () => import('../views/layout/subject/Index.vue')
const Welcome = () => import('../views/layout/welcome/Index.vue')

const router = new VueRouter({
  //  路由元信息,写在meta中
  routes: [
    { path: '/login', component: Login, meta: { title: '登录' } },
    { path: '/', redirect: '/login' },
    {
      path: '/layout', component: Layout, redirect: '/layout/welcome', meta: { title: '后台管理', roles: ['超级管理员', '管理员', '老师', '学生'] }, children: [
        {
          path: 'welcome', component: Welcome, meta: {
            title: '首页',
            fullPath: '/layout/welcome',
            icon: 'el-icon-s-home',
            roles: ['超级管理员', '管理员', '老师', '学生']
          }
        },
        {
          path: 'chart', component: Chart, meta: {
            title: '数据预览',
            fullPath: '/layout/chart',
            icon: 'el-icon-pie-chart',
            roles: ['超级管理员', '管理员', '老师', '学生']
          }
        },
        {
          path: 'user', component: User, meta: {
            title: '用户列表',
            fullPath: '/layout/user',
            icon: 'el-icon-user',
            roles: ['超级管理员', '管理员', '老师']
          }
        },
        {
          path: 'enterprise', component: Enterprise, meta: {
            title: '企业列表',
            fullPath: '/layout/enterprise',
            icon: 'el-icon-office-building',
            roles: ['超级管理员', '管理员', '老师']
          }
        },
        {
          path: 'question', component: Question, meta: {
            title: '题库列表',
            fullPath: '/layout/question',
            icon: 'el-icon-edit-outline',
            roles: ['超级管理员', '管理员', '老师', '学生']
          }
        },
        {
          path: 'subject', component: Subject, meta: {
            title: '学科列表',
            fullPath: '/layout/subject',
            icon: 'el-icon-notebook-2',
            roles: ['超级管理员', '管理员', '老师']
          }
        },
      ]
    },
    { path: '*', component: Notfound }
  ]
})
import { getToken } from '../untils/token'
// 配置路由守卫 (前置守卫)
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
router.afterEach((to) => {
  // callback && callback(参数)
  document.title = to.meta.title || '黑马面面'
})
export default router
