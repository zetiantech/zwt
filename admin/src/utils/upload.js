import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 转换请求方式
axios.defaults.transformRequest = [function(data) {
  const param = new FormData()
  Object.keys(data).forEach((key) => {
    param.append(key, data[key])
  })
  return param
}]
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'multipart/form-data'
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['access_token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code != null && res.code !== 0) {
      if (res.code === 200004) {
        // 加载数据字典
        store.dispatch('RefreshToken').then(() => {
          var originalRequest = response.config
          originalRequest._retry = true
          // Do something before request is sent
          if (store.getters.token) {
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            originalRequest.headers['access_token'] = getToken()
          }
          return axios.request(originalRequest)
        })
      } else if (res.code === 100008 || res.code === 100009) {
        // 请自行在引入 MessageBox
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
    }
    return Promise.resolve(response)
  },
  error => {
    let errorMsg = ''
    if (error.data && error.data.msg) {
      errorMsg = error.data.msg
    } else if (error.message) {
      errorMsg = error.message
    } else {
      errorMsg = '未知异常'
    }
    Message({
      message: errorMsg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
