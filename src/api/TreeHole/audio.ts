import request from '@/utils/request'
// 获得音乐列表
export const articleList = () => {
    return request('/audio/index/audioList', {
        method: 'get',
    })
}