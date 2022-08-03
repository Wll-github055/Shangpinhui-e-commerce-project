// search模块小仓库
import { reqGetSearchInfo } from '@/api'

const actions={
    async getSearchList(context,data={}){
        let result=await reqGetSearchInfo(data)
        if(result.code===200){
            context.commit('GETSEARCHLIST',result.data)
        }
    }
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const state={
    searchList:{},
}
// 项目中，getters主要作用是：简化仓库中的数据
const getters={
    goodsList(state){
        // 如果state.searchList.goodsList由于网络等其他原因并未成功获取到，值应该是undefined，此时返回一个空数组
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
}

export default{
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}