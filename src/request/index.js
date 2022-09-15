import axios from 'axios'
import { getToken }  from './authority.js'
console.log(222222,getToken())

const CancelToken = axios.CancelToken
const pendingReq = {}
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 3600000, // request timeout
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      // JWT鉴权
      config.headers.Authorization = getToken()
      // 取消请求
      const key = config.url + '&' + config.method
      pendingReq[key] && pendingReq[key]('操作太频繁了~')
      config.cancelToken = new CancelToken(c => {
        pendingReq[key] = c
      })
    }
    return config
  },
  error => Promise.reject(error)
)

service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default service
