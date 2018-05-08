import Vue from 'vue'

export default function (router, store) {
  Vue.http.defaults.timeout = 15 * 1000
  Vue.http.defaults.baseURL = 'http://192.168.1.102:5555/'
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
      case 401:
        router.replace({name: 'login-page', query: { redirectName: router.currentRoute.name, redirectParam: router.currentRoute.params }})
        break
      case 404:
        // 不知道有没有报 404 但不需要跳转的页面
        router.replace({ name: '404' })
        console.log(404, '此内容不存在', res.url)
        break
      case 500:
        if (error.url.indexOf('NoHandleErr') > 0) {
          break
        }
        const errorData = res.body
        console.error(errorData)
        break
      default:
        break
    }
    return Promise.reject(error)
  })
}
