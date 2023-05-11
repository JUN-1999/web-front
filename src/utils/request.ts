import axios from 'axios';
import type { AxiosRequestConfig } from 'axios'
import { useTreeHoleUserStore } from '@/stores/ThreeHoleUser'

const instance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL
});

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
