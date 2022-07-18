import Vue from 'vue'
import App from '@/App.vue'

// 将三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav) // Vue.component()第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

import router from '@/router'
import store from '@/store'
import '@/mock/mockServer'  //引入mockServer.js
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App), 
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
  // 注册路由:key-value形式，key和value一致可省略value
  router,  // 注册路由信息：执行完router后，组件身上都拥有了$route,$router属性
  store  // 注册仓库：组件实例上会多一个$store属性
}).$mount('#app')
