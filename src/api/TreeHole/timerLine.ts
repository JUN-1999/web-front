import request from '@/utils/request'
// 添加时间轴
export const addTimeLine = (data: any) => {
    return request('/treehole/timeline/addTimeLine', {
        method: 'post',
        data
    })
}
// 删除时间轴
export const deleteTimeLine = (data: any) => {
    return request('/treehole/timeline/deleteTimeLine', {
        method: 'post',
        data
    })
}
// 获得时间轴
export const getTimeLine = (data: any) => {
    return request('/treehole/timeline/getTimeLineList', {
        method: 'post',
        data
    })
}