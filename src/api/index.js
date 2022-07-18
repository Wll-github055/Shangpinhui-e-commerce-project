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
    method:'get'
})

// 获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要参数
// 当前接口给服务器传递的params参数，至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({
    url:'/list',
    method:'post',
    data:params
})

