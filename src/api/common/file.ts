import request from '@/utils/request'

// 上传文件
export const uploadFile = (data: any) => {
    return request('/file/qiniu/uploadIMG', {
        method: 'post',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}