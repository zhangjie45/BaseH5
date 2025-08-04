import Request from 'luch-request'
import { GET_TOKEN } from '@/utils/token'
const duration = 2 * 1000

const getBaseUrl = () => {
  let baseUrl = ''
  switch (process.env.NODE_ENV) {
    case 'development':
      // 开发环境
      baseUrl = 'http://localhost:8080'
      break
    case 'production':
      // 生产环境
      baseUrl = 'http://api.example.com'
      break
  }
  return baseUrl
}

class HttpCommon {


  static common (props) {
    let servicesParams = {
      timeout: props && props.timeout ? props.timeout : 30000,
      withCredentials:
        props && props.withCredentials ? props.withCredentials : true,
    }
    const http = new Request(servicesParams);
    //白名单，不需要加token的接口
    const WHITE_URL = ['/sendMessage/SYSLOGINSERVICE/LOGIN', '/sendMessage/PRODOCUMENTSERVICE/F']
    console.log("http--->", http);

    http.interceptors.request.use(
      request => {
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        if (GET_TOKEN() && !WHITE_URL.includes(request.url)) {
          request.header['Authorization'] = 'Bearer ' + GET_TOKEN()
        }

        request.url = getBaseUrl() + request.url


        return request
      },
      error => {
        uni.hideLoading()
        uni.showToast({
          title: '网络异常，请稍后重试',
          icon: 'none',
          duration: duration
        })
        return Promise.reject(error)
      }
    )

    http.interceptors.response.use(
      response => {
        uni.hideLoading()
        let respon = response.data;
        if (respon.code === 401) {
          uni.reLaunch({
            url: '/pages/login/index'
          })
          uni.showToast({
            title: '登录超时,请重新登录',
            icon: 'none',
            duration: duration
          })
          return;
        }

        let res = response.data.ajaxResult || { code: 500, msg: '网络异常，请稍后重试' }
        if (res.code !== 200) {
          uni.showToast({
            title: res.msg || 'Error',
            icon: 'none',
            duration: duration
          })
          return Promise.reject(new Error(res.message || 'Error'))
        } else if (res.code === 500 || res.code === '5000') {
          return res.message
        } else {
          return res
        }
      },
      error => {
        console.log("error--->", error);
        uni.hideLoading()
        if (error.statusCode === 401) {
          uni.reLaunch({
            url: '/pages/login/index'
          })
          uni.showToast({
            title: '请登录',
            icon: 'none',
            duration: duration
          })
        } else {
          uni.showToast({
            title: '网络异常，请稍后重试',
            icon: 'none',
            duration: duration
          })
        }
        return Promise.reject(error)
      }
    )

    return http
  }
}


class RequestUtil {
  init (props) {
    return HttpCommon.common(props)
  }
}
const request = new RequestUtil()

export default request
