import { ElMessage } from 'element-plus'
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 50000 
})

/**
 * Request interceptor
 */
service.interceptors.request.use((config: any) => {
  config.headers['Content-Type'] = 'application/json';
  return config
})

/**
 * Response interceptor
 * Simplify error handling
 */
service.interceptors.response.use(response => {
  const res = response.data

  if (res.code !== 200) {
    ElMessage({
      message: res.message || 'Error occurred',
      type: 'error',
      duration: 50000
    })
    return Promise.reject(new Error(res.message || 'Error occurred'))
  } else {
    return res
  }
}, error => {
  console.error('Request error', error)
  ElMessage({
    message: error.message || 'Network error',
    type: 'error',
    duration: 5000
  })
  return Promise.reject(error)
})

export default service