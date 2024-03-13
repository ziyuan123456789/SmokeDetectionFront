import axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:8089'
const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    console.log(config.includeToken)
    if (config.includeToken === undefined) {
      console.log('必须声明includeToken来指示是否应包含token')
      throw new Error('必须声明includeToken来指示是否应包含token')
    }

    if (config.includeToken) {
      let tokenData = localStorage.getItem('loginData')
      if (tokenData) {
        tokenData = JSON.parse(tokenData) 
        config.headers['Authorization'] = `Bearer ${tokenData.token}`
      } else {
        ElMessage.error('请求需要携带登录信息，但未找到token。')
        return Promise.reject(new Error('需要登录'))
      }
    }

    delete config.includeToken
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      ElMessage.error('服务器致命错误')
    } else if (error.response && error.response.status === 401) {
      ElMessage.error('登录已经过期,请重新登录')
      localStorage.removeItem('loginData')
    }
    return Promise.reject(error)
  }
)

export function get(url, params, includeToken = false) {
  return instance.get(url, { params, includeToken })
}

export function post(url, data, includeToken = false) {
  return instance.post(url, data, {
    includeToken,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
}

export function del(url, includeToken = false) {
  return instance.delete(url, { includeToken })
}

export function put(url, data, includeToken = false) {
  return instance.put(url, data, { includeToken })
}
