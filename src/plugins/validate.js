// vee-validate插件：表单验证区域
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与原密码相同` // 修改内置规则的message，让确认密码和密码相同
    },
    // 给校验的field属性名映射中文名称
    attributes:{
        phone:'手机号',
        code:'验证码',
        password:'密码',
        checkPassword:'确认密码',
        isAgree:'协议'
    }
})

// 自定义校验规则
VeeValidate.Validator.extend('isAgree',{
    validate:value=>{
        return value
    },
    getMessage:filed=>filed+'必须同意'
})