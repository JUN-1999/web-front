import request from '@/utils/request'

// 发送验证码
export const sendAuthCode = (data: any) => {
    return request('/treehole/user/sendAuthCode', {
        method: 'post',
        data
    })
}
// 判断用户是否唯一
export const isAccountOnly = (data: any) => {
    return request('/treehole/user/isAccountOnly', {
        method: 'post',
        data
    })
}
// 判断邮箱是否使用
export const isEmailOnly = (data: any) => {
    return request('/treehole/user/isEmailOnly', {
        method: 'post',
        data
    })
}

// 发送注册信息
export const postRegisterApi = (data: any) => {
    return request('/treehole/user/register', {
        method: 'post',
        data
    })
}

// 登录
export const postLogin = (data: any) => {
    return request('/treehole/user/login', {
        method: 'post',
        data
    })
}