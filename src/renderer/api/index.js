import Vue from 'vue'
import Store from '@/store'

const showError = (res) => {
  const { data } = res
  if (typeof data.message === 'string' && data.message.length > 0) {
    Store.commit('App/SET_ERROR_MESSAGE', data.message)
  }
}

export default function (router, store) {
  Vue.http.defaults.timeout = 15 * 1000
  Vue.http.defaults.baseURL = 'https://katip.hiyali.org/api' // 'http://192.168.1.102:5555/'
  Vue.http.defaults.headers.post['Content-Type'] = 'application/json' // 'application/x-www-form-urlencoded'

  Vue.http.interceptors.request.use(function (config) {
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  Vue.http.interceptors.response.use(function (response) {
    // Do something with response data
    return response
  }, function (error) {
    const res = error.response
    switch (res.status) {
      case 400:
        showError(res.data)
        return
      case 401:
        if (router.currentRoute.name !== 'login-page') {
          router.replace({name: 'login-page', query: { redirectName: router.currentRoute.name, redirectParam: router.currentRoute.params }})
        }
        showError(res)
        break
      case 404:
        router.replace({ name: '404' })
        break
      case 500:
        if (error.url.indexOf('NoHandleErr') > 0) {
          break
        }
        showError(res)
        break
      default:
        break
    }
    return Promise.reject(error)
  })
}
