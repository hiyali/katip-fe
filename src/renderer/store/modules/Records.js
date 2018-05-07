import Vue from 'vue'

const state = {
  recordsList: undefined
}

const mutations = {
  SET_RECORDS_LIST (state, data) {
    state.recordsList = data
  },
  CONCAT_RECORDS_LIST (state, data) {
    state.recordsList.push(data)
  }
}

const actions = {
  getRecordsList ({ commit }, params) {
    Vue.http.get('/records', params = { skip: 0, limit: 10 }).then((res) => {
      if (params.skip > 0) {
        commit('CONCAT_RECORDS_LIST', res.data)
      } else {
        commit('SET_RECORDS_LIST', res.data)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
