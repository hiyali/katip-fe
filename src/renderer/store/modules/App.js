const state = {
  themeDark: !!localStorage.getItem('Katip_theme_dark'),
  errorMessage: {
    id: 0,
    msg: undefined
  }
}

const getters = {
  themeDark: state => state.themeDark,
  errorMessage: state => state.errorMessage
}

const mutations = {
  SET_THEME_DARK (state, themeDark) {
    if (themeDark) {
      localStorage.setItem('Katip_theme_dark', themeDark)
      state.themeDark = themeDark
    } else {
      localStorage.removeItem('Katip_theme_dark')
      state.themeDark = false
    }
  },
  SET_ERROR_MESSAGE (state, msg) {
    state.errorMessage = {
      id: state.errorMessage.id++,
      msg
    }
  }
}

const actions = {
  setThemeDark ({ commit }, themeDark) {
    commit('SET_THEME_DARK', themeDark)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
