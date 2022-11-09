import axios from 'axios'
import Vrouter from '@/router'
import { getToken } from './auth'
const Router = Vrouter

console.log('import.meta.env.VITE_BASE_API', import.meta.env.VITE_BASE_API)
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API as string,
  timeout: 999999
})

//http request 拦截器
service.interceptors.request.use(
  (config: any) => {
    if (getToken()) {
      config.headers['asr-token'] = getToken()
    }
    return config
  },
  (err) => {
    console.error(err)
    return Promise.reject(err)
  }
)

//http response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 9) {
      // Router.replace('/rejectUser');
      return
    }
    return response.data
  },
  (error) => {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 403
    ) {
      //   logout().then(() => {
      //     // removeToken()
      //   });
    }
    if (error.message && error.message.includes('timeout')) {
      console.error('请求超时')
      return error.message
    }
    if (
      error.response &&
      error.response.status &&
      error.response.status === 500
    ) {
      console.error('接口异常')
      return error
    }
    return error
  }
)

export default service
