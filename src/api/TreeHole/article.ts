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