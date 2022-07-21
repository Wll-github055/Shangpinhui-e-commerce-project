// 购物车模块小仓库
import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
const actions={
    async getCartList(context){
        let result=await reqGetCartList()
        if(result.code===200){
            context.commit('GETCARTLIST', result.data)
        }
    },
    async deleteCartListById(context,skuId){
        let result=await reqDeleteCartById(skuId)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async updateCheckedById(context,{skuId,isChecked}){
        let result=await reqUpdateCheckedById(skuId,isChecked)
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked === 1 ? dispatch('deleteCartListById',item.skuId):''
            PromiseAll.push(promise)
        });
        // 只有全部的promise都成功，返回结果才是成功，只要有一个失败，返回即为失败
        return Promise.all(PromiseAll)
    },
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked != isChecked ? dispatch('updateCheckedById',{skuId:item.skuId,isChecked}):''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations={
    GETCARTLIST(state,data){
        state.cartInfo=data
    }
}
const state={
    cartInfo:[]
}
const getters={
    cartList(state){
        return state.cartInfo[0] || {}
    }
}

export default{
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}