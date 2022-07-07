import Vue from 'vue'
import App from '@/App.vue'

// 将三级联动组件注册为全局组件
import TypeNav from '@/pages/Home/TypeNav'
Vue.component(TypeNav.name,TypeNav) // Vue.component()第一个参数：全局组件的名字 第二个参数：哪一个组件

import router from '@/router'

Vue.config.productionTip = false


import {reqCategoryList} from '@/api'
reqCategoryList()

new Vue({
  render: h => h(App),
  // 注册路由:key-value形式，key和value一致可省略value
  // 注册路由信息：执行完router后，组件身上都拥有了$route,$router属性
  router
}).$mount('#app')
