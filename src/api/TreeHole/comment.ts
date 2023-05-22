import request from '@/utils/request'
// 发布评论
export const postSendCommentApi = (data: any) => {
    return request('/treehole/comment/sendComment', {
        method: 'post',
        data
    })
}
// 获得评论列表
export const getCommentListAPi = (params: any) => {
    return request('/treehole/comment/commentList', {
        method: 'get',
        params
    })
}