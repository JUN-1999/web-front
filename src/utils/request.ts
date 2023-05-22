import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useTreeHoleUserStore } from '@/stores/ThreeHoleUser'
import router from '@/router';
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL
});
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  const { token } = useTreeHoleUserStore();
  // 鉴权token , 给头部带上token
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}, err => {
  return Promise.reject(err.data.console.error.message);
})

// 添加响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  // token过期操作
  if (response.data.code == 401) {
    const { setToken } = useTreeHoleUserStore();
    localStorage.setItem('token', '');//本地缓存token为空
    setToken(''); //pinia 中的token为空
    ElMessage({
      message: response.data.message,
      type: 'warning',
    })
    setTimeout(() => {
      router.push('/TreeHole/login')
    }, 1000);
  }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  ElMessage({
    message: error.message,
    type: 'error',
  })
  console.log(error);

  return Promise.reject(error);
});

interface IAxiosResponse {
  data: any,
  errmsg: String,
  errno: Number
}

export const request: (url: string, config?: AxiosRequestConfig<any>) => Promise<IAxiosResponse> = (url, config) => {
  return new Promise((resolve, reject) => {
    instance(url, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export default request
