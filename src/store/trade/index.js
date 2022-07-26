// trade 小仓库
import { reqUserAddressInfo, reqOrderInfo } from '@/api'
const actions={
    async getUserAddressInfo(context){
        let result=await reqUserAddressInfo()
        if(result.code===200){
            context.commit('GETUSERADDRESSINFO',result.data)
        }
    },
    async getOrderInfo(context){
        let result=await reqOrderInfo()
        if(result.code===200){
            context.commit('GETORDERINFO',result.data)
        }
    }

}
const mutations={
    GETUSERADDRESSINFO(state,data){
        state.userAddress=data
    },
    GETORDERINFO(state,data){
        state.orderInfo=data
    }
}
const state={
    userAddress:[],
    orderInfo:{}
}
const getters={}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}