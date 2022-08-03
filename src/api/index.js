// 当前这个模块：对API进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'

// 三级联动接口 /api/product/getBaseCategoryList get 无参数
// 发请求：axios发送请求，返回Promise对象
export const reqGetCategoryList=()=>requests({
    url:'/product/getBaseCategoryList',
    method:'get'
})

// 获取banner
export const reqGetBannerList=()=>mockRequests({
    url:'/banner',
    method:'get'
})

// 获取floor数据
export const reqGetFloorList=()=>mockRequests({
    url:'/floor',
    method:'post'
})

// 获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要参数
// 当前接口给服务器传递的params参数，至少是一个空对象
export const reqGetSearchInfo=(data)=>requests({
    url:'/list',
    method:'post',
    data
})

// 获取商品详情 地址：/api/item/{skuid} get 参数：skuId
export const reqGoodsInfo=(skuId)=>requests({
    url:`/item/${skuId}`,
    method:'get'
})

// 将产品添加到购物车（或者更新某一个产品的个数） 地址：/api/cart/addToCart/{ skuId }/{ skuNum } 请求方式：post 参数：skuId、skuNum
export const reqAddOrUpdateShorCart=(skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

//获取购物车列表 地址：/api/cart/cartList 请求方式：get 无参数
export const reqGetCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})

// 删除购物车商品 地址：/api/cart/deleteCart/{skuId} 请求方式：delete 参数：skuId
export const reqDeleteCartById=(skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})

// 切换商品选中状态 地址：/api/cart/checkCart/{skuID}/{isChecked} 请求方式：get 参数：skuID、isChecked
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

// 获取验证码 地址：/api/user/passport/sendCode/{phone} 请求方式：get 参数：phone
export const reqGetCode=(phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
})

// 提交注册 地址：/api/user/passport/register 请求方式：post 参数：phone、password、code
export const reqUserRegister=(data)=>requests({
    url:'/user/passport/register',
    method:'post',
    data
})

// 登录
export const reqUserLogin=(data)=>requests({
    url:'/user/passport/login',
    method:'post',
    data
})

// 获取用户信息【需要带着用户的token向服务器获取用户信息】
export const reqUserInfo=()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

// 退出登录 
export const reqLogOut=()=>requests({
    url:'/user/passport/logout',
    method:'get'
})

// 获取用户地址信息 地址：/api/user/userAddress/auth/findUserAddressList
export const reqUserAddressInfo=()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

// 获取交易页订单信息 地址：/api/order/auth/trade
export const reqOrderInfo=()=>requests({
    url:'/order/auth/trade',
    method:'get'
})

// 提交订单 地址：/api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式：post  既有query参数又有params参数
export const reqSubmitOrder=(tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})

// 获取支付信息 请求方式：get
export const reqPayInfo=(orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

// 获取支付状态 请求方式：get
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

// 获取个人中心的数据
export const reqMyOrderList=(page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})
