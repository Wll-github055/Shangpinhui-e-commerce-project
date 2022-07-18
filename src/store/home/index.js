// home模块小仓库
import { reqGetBannerList, reqGetCategoryList, reqGetFloorList } from '@/api'

const actions = {
    async getCategoryList(context){
        let result = await reqGetCategoryList()
        if(result.code === 200){
            context.commit('GETCATEGORYLIST',result.data)
        }
    },
    async getBannerList(context){
        let result=await reqGetBannerList()
        if(result.code === 200){
            context.commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList(context){
        let result=await reqGetFloorList()
        if(result.code===200){
            context.commit('GETFLOORLIST',result.data)
        }
    }

}
const mutations = {
    GETCATEGORYLIST(state,categoryList){
        state.categoryList=categoryList.slice(0,categoryList.length-2)
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
const state = {
    // state中数据默认初始化值，要根据接口返回值来进行初始化
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}