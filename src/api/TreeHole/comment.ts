import request from '@/utils/request'
// 发布评论
export const sendComment = (data: any) => {
    return request('/treehole/comment/sendComment', {
        method: 'post',
        data
    })
}