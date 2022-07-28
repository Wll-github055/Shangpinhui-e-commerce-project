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
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

// 引入store
import store from '@/store'

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
let router = new VueRouter({
    routes:[
        // 重定向，在项目刚运行的时候，访问/，立马定向到首页
        {
            path:'/',
            redirect:'/home',
        },
        // 重定向，在进入个人中心时，里面定向到myOrder
        {
            path: '/center',
            redirect: '/center/myorder',
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
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            name: 'shopcart',
            path: '/shopcart',
            component: ShopCart,
            meta: { show: true }
        },
        {
            name: 'trade',
            path: '/trade',
            component: Trade,
            meta: { show: true },
            // 路由独享守卫
            beforeEnter:(to, from, next)=> {
                // 去交易页面，必须是从购物车而来
                if(from.path === '/shopcart'){
                    next()
                }else{
                    // 如果是从其他路由组件而来，则停留在当前页面
                    next(false)
                }
            }
        },
        {
            name: 'pay',
            path: '/pay',
            component: Pay,
            meta: { show: true },
            beforeEnter:(to,from,next)=>{
                if(from.path === '/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            name: 'paysuccess',
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true }
        },
        {
            name: 'center',
            path: '/center',
            component: Center,
            meta: { show: true },
            children:[
                {
                    name:'myorder',
                    path:'myorder',
                    component:myOrder
                },
                {
                    name: 'grouporder',
                    path: 'grouporder',
                    component: groupOrder
                },
            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
    let token=store.state.user.token
    let name=store.state.user.userInfo.name
    if(token){
        // 已经登录了，想去login，让它停在首页
        if(to.path ==='/login'){
            next('/home')
        }else{
            // 登陆了，去的不是login
            // 若果已经有用户信息
            if(name){
                next()
            }else{
                // 没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    // token失效了  清除token，重新登录
                    await store.dispatch('user/userLogOut')
                    next('/login')
                }
            }
        }
    }else{
        // 用户未登录时的业务逻辑
        let toPath=to.path
        if(toPath.includes('/trade') || toPath.includes('/pay') || toPath.includes('/center')){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})

export default router