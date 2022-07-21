import { v4 as uuidv4 } from 'uuid'

// 生成一个随机字符串，且游客身份永久存储，一个用户只有一个uuid
export const getUUID=()=>{
    // 先从本地存储获取uuid
    let uuid_token=localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        // 本地存储中没有，则重新生成一个
        uuid_token=uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token) //并将生成的uuid存储到localStorage
    }
    return uuid_token
}