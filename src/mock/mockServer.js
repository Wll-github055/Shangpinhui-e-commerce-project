import Mock from 'mockjs' //引入mockjs模块

// 引入JSON格式的数据 思考：JSON数据根本没有对外暴露，为什么能够引入？因为webpack默认对外暴露：图片、json格式的数据
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数表示请求地址；第二个参数表示请求的数据
Mock.mock('/mock/banner',{code:200,data:banner}) //模拟首页轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor})  //