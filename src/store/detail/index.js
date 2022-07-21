import { reqGoodsInfo, reqAddOrUpdateShorCart } from "@/api"
import {getUUID} from '@/utils/uuid_token'
const actions={
    async getGoodsInfo(context,skuid){
        let result=await reqGoodsInfo(skuid)
        if(result.code===200){
            context.commit('GETGOODSINFO',result.data)
        }
    },
    async addOrUpdateShorCart(context,{skuId,skuNum}){
        let result=await reqAddOrUpdateShorCart(skuId,skuNum)
        // 服务器写入数据成功，返回的是promise对象，code=200，表示操作成功
        // 且如果回调函数中返回的结果是非Promise类型的数据，则状态为成功，返回值作为对象成功的值
        if(result.code===200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }

}

const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo
    }
}

const state={
    goodsInfo:{},
    uuid_token:getUUID()
}

const getters={
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}