import request from '@/utils/request'
// 获得近三天天气
export const weather3d = (data: any) => {
    return request('/weather/index/weather3d', {
        method: 'post',
        data
    })
}
// 获得实时天气
export const weatherNow = (data: any) => {
    return request('/weather/index/index', {
        method: 'post',
        data
    })
}