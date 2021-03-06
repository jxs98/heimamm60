import Vue from 'vue'
import App from './App.vue'
//  引入路由组件
import router from './router'

// 引入element-ui文件
import './plugins/element'
//  引入富文本编辑器
import './plugins/edit'
// 引入全局样式
import './assets/css/grobal.less'
// 导入仓库
import store from '@/store'
//  引入axios配置文件
import './untils/request'
new Vue({
  router,
  store,//  注入到根实例
  render: h => h(App)
}).$mount('#app')
