// 配置路由
import Vue from "vue";
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

// 先把VueRouter原型对象的push保存一份
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace

// 重写push | replace
VueRouter.prototype.push=function(to,resolve,reject){
    if(resolve && reject){
        originPush.call(this,to,resolve,reject)
    }else{
        originPush.call(this,to,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function (to, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, to, resolve, reject)
    } else {
        originReplace.call(this, to, () => { }, () => { })
    }
}

// 配置路由
export default new VueRouter({
    routes:[
        // 重定向，在项目刚运行的时候，访问/，立马定向到首页
        {
            path:'/',
            redirect:'/home',
        },
        {
            path:'/home',
            component:Home,
            meta:{show:true}
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            name:'search',
            path: '/search/:keyword?',
            component: Search,
            meta: { show: true },  
        },
        {
            name: 'detail',
            path:'/detail/:goodId',
            component:Detail,
            meta:{show:true}
        },
        {
            name: 'AddCartSuccess',
            path: '/AddCartSuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            name: 'ShopCart',
            path: '/ShopCart',
            component: ShopCart,
            meta: { show: true }
        }
        
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})