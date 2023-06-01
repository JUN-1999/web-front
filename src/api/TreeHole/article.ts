import request from '@/utils/request'
// 查询文章列表
export const articleList = (params: any) => {
    return request('/treehole/article/articleList', {
        method: 'get',
        params
    })
}
// 查询具体文章
export const getArticleInfoApi = (params: any) => {
    return request('/treehole/article/articleInfo', {
        method: 'get',
        params
    })
}
// 发布、更新 文章
export const updateArticle = (form: any, id: number = 0) => {
    return request('/treehole/article/updateArticle', {
        method: 'post',
        data: {
            form,
            id
        }
    })
}
// 获得该用户种下的瓜的列表
export const getArticleCreateApi = () => {
    return request('/treehole/article/articleCreate', {
        method: 'get',
    })
}
// 获得该用户关注的瓜的列表
export const getArticleFollowApi = () => {
    return request('/treehole/article/articleFollow', {
        method: 'get',
    })
}
// 删除某个瓜
export const postDeleteArticleApi = (data: any) => {
    return request('/treehole/article/updateArticleStatus', {
        method: 'post',
        data
    })
}