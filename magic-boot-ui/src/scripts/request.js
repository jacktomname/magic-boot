import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/scripts/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

var currentMessage
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.config.url.indexOf('user/info') !== -1 && response.data.code === 402) {
      store.dispatch('user/logout').then(() => {
        location.reload()
      })
    }
    return new Promise((reslove, reject) => {
      const res = response.data
      if (res.code !== 200) {
        var duration = 5
        if (res.code === 402) {
          duration = 1
          MessageBox.prompt(`当前账号：${store.getters.username}凭证已过期，请输入密码重新登录`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '退出',
            inputType: 'password',
            closeOnClickModal: false,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                store.dispatch('user/login', {
                  username: store.getters.username,
                  password: instance.inputValue
                }).then((res) => {
                  if (res) {
                    done()
                    service(response.config).then(ret => reslove(ret))
                  }
                })
              } else if (action === 'cancel') {
                store.dispatch('user/logout').then(() => {
                  location.reload()
                })
              } else {
                done()
              }
            }
          })
        }
        if (res.code !== 402) {
          if(currentMessage){
            currentMessage.close()
          }
          currentMessage = Message({
            message: res.message || 'Error',
            type: 'error',
            duration: duration * 1000,
            showClose: true
          })
          reject(res)
        }
      } else {
        reslove(res)
      }
    })
  },
  error => {
    // console.log('err' + error) // for debug
    if(currentMessage){
      currentMessage.close()
    }
    currentMessage = Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
