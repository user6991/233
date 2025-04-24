import { useUserStore } from '@/stores'
import router from '@/router'
import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios';
import { showToast } from "vant";
import { useLoading } from '@/hooks/loading'
const loadingService = useLoading()
const baseURL = import.meta.env.VITE_BASE_URL

// 定义后端返回数据的通用类型
interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    
    loadingService.open()
    // if (store.user?.token) {
    //   loadingService.open()
    //   config.headers.Authorization = `Bearer ${store.user.token}`
    // }
    return config
  },
  (err) => {
    loadingService.close()
    return Promise.reject(err)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res: AxiosResponse<ApiResponse<any>>) => {
    // 只有当响应结果为200时才认为请求成功，此时关闭loading并返回数据
    if (res.data.code === 200) {      
      loadingService.close();
      // 返回 result 字段中的数据
      return res.data.result;
    }

    // 请求不成功，关闭loading并显示相应提示信息，然后返回被拒绝的Promise
    loadingService.close();
    showToast(res.data.message || '服务异常');
    return Promise.reject(res.data);
  },
  (err) => {
    // 先关闭loading，无论错误类型如何，都先确保loading状态被正确处理
    loadingService.close();
    // 显示错误提示信息，并返回被拒绝的Promise
    showToast(err.response?.data?.message || '服务异常');
    return Promise.reject(err);
  }
);

export { baseURL, request }