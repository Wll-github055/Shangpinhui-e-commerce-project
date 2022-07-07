import axios from "axios";

// 1、利用axios对象的方法create，去创建一个axios实例
// 2、过稍微配置一下
const requests=axios.create({
    baseURL: '/api',  // 基础路径，发请求的时候，路径中会出现api
    timeout:5000,  //请求超时时间
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，就可以在发送请求之前做一些事情
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里面还有一个属性很重要，headers请求头
    return config
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到，可以进行一些操作
    return res.data
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new Error('fail'))
})

export default requests