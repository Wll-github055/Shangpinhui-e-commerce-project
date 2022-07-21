// 用户小仓库
import { reqGetCode, reqUserRegister, reqUserLogin,reqUserInfo } from '@/api'

const actions={
    async getCode(context,phone){
        let result=await reqGetCode(phone)
        if(result.code===200){
            context.commit('GETCODE',result.data)
        }
    },
    async userRegister(context,data={}){
        let result = await reqUserRegister(data)
        console.log(result);
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogin(context,data={}){
        let result=await reqUserLogin(data)
        if(result.code===200){
            context.commit('USERLOGIN',result.data.token)
            // 持久化存储token
            localStorage.setItem('token',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo(context){
        let result=await reqUserInfo()
        if(result.code === 200){
            context.commit('GETUSERINFO',result.data)
        }
    }

}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    }
}
const state={
    code:'',
    token:localStorage.getItem('token'),
    userInfo:{}
}
const getters={}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}