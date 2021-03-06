import Vue from 'vue'

const state = {
  userInfo: undefined
}

const getters = {
  isLogin: state => state.userInfo && state.userInfo.id > 0,
  userInfo: state => state.userInfo
}

const mutations = {
  SET_USER_INFO (state, data = null) {
    state.userInfo = data
  },
  SET_TOKEN (_, token) {
    localStorage.setItem('Katip_token', token)
    Vue.http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  CLEAR_TOKEN (_) {
    localStorage.removeItem('Katip_token')
    Vue.http.defaults.headers.common['Authorization'] = null
  }
}

const actions = {
  login ({ commit }, body) {
    return Vue.http.post('/auth/login', body).then((res) => {
      commit('SET_USER_INFO', res.data.userInfo)
      commit('SET_TOKEN', res.data.token)
      return res.data
    })
  },
  register (_, body) {
    return Vue.http.post('/register', body).then((res) => {
      return res.data
    })
  },
  checkToken ({ dispatch, commit }) {
    const token = localStorage.getItem('Katip_token')
    if (!token) {
      const error = 'Token doesn\'t exist!'
      Promise.reject(error)
    }
    commit('SET_TOKEN', token)
    return dispatch('getUserInfo')
  },
  async logout ({ commit }) {
    await commit('CLEAR_TOKEN')
    await commit('SET_USER_INFO')
    await commit('Record/CLEAR_RECORD_LIST', null, { root: true })
    return Promise.resolve()
  },
  getUserInfo ({ commit }, params) {
    return Vue.http.get('/user', params).then((res) => {
      commit('SET_USER_INFO', res.data)
      return res
    })
  },
  updateInfo ({ dispatch }, params) {
    return Vue.http.put('/user', params).then((res) => {
      return dispatch('getUserInfo')
    })
  },
  changePassword (_, params) {
    return Vue.http.put('/user/change-password', params).then((res) => {
      return res
    })
  },
  sendResetPasswordEmail (_, body) {
    return Vue.http.post('/forget-password', body).then((res) => {
      return res
    })
  },
  resetPassword (_, body) {
    return Vue.http.post('/reset-password', body).then((res) => {
      return res
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
