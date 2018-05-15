import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/fonts/material-icons.css'

import App from './App'
import '@/assets/style/main.css'
import router from './router'
import store from './store'
import configurations from './api'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(Vuetify)
Vue.http = Vue.prototype.$http = axios
configurations(router, store)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
