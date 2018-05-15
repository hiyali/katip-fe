import Vue from 'vue'

const state = {
  record: {
    loaded: false,
    skip: 0,
    limit: 20,
    list: undefined
  },
  types: [
    {
      title: 'Password',
      type: 'PASSWORD',
      icon: 'lock'
    },
    {
      title: 'Text',
      type: 'TEXT',
      icon: 'loyalty'
    },
    {
      title: 'Key',
      type: 'KEY',
      icon: 'vpn_key'
    }
  ],
  filterType: null,
  filterTitle: ''
}

const getters = {
  record: state => {
    let filteredList
    if (state.record.list && state.record.list.length > 0) {
      if (state.filterType) {
        filteredList = {
          ...state.record,
          ...{
            list: state.record.list.filter(record => record.type === state.filterType)
          }
        }
      }
      if (state.filterTitle) {
        filteredList = {
          ...state.record,
          ...{
            list: (filteredList || state.record).list.filter(record => record.title.indexOf(state.filterTitle) > -1)
          }
        }
      }
      if (filteredList) {
        return filteredList
      }
    }

    return state.record
  },
  types: state => state.types
}

const mutations = {
  SET_RECORD_LIST (state, data) {
    state.record = {
      ...state.record,
      ...{
        loaded: data.length < state.record.limit,
        skip: 0,
        list: data
      }
    }
  },
  CONCAT_RECORD_LIST (state, data) {
    state.record.list.push(data)
    state.record.loaded = data.length < state.record.limit
    state.record.skip = state.record.skip + state.record.limit
  },
  SET_FILTER_TYPE (state, type) {
    if (state.filterType !== type) {
      state.filterType = type
    } else {
      state.filterType = null
    }
  },
  SET_FILTER_TITLE (state, title) {
    state.filterTitle = title
  },
  UPDTE_RECORD_ITEM (state, data) {
    const itemIndex = state.record.list.findIndex(item => item.id === data.id)
    state.record.list.splice(itemIndex, 1, data)
  }
}

const actions = {
  getRecordList ({ state, commit }, params = { skip: state.record.skip, limit: state.record.limit }) {
    return Vue.http.get('/record', { params }).then((res) => {
      if (params.skip > 0) {
        commit('CONCAT_RECORD_LIST', res.data)
      } else {
        commit('SET_RECORD_LIST', res.data)
      }
      return res.data
    })
  },
  filterByType ({ commit }, type) {
    commit('SET_FILTER_TYPE', type)
  },
  filterByTitle ({ commit }, title) {
    commit('SET_FILTER_TITLE', title)
  },
  getRecordById ({ state }, filterId) {
    if (!state.record.list) {
      return undefined
    }
    return state.record.list.find(item => item.id === filterId)
  },
  createRecord ({ commit }, record) {
    return Vue.http.post('/record', record).then((res) => {
      commit('CONCAT_RECORD_LIST', res.data)
      return res.data
    })
  },
  updateRecord ({ dispatch }, record) {
    return Vue.http.put('/record/' + record.id, record).then((res) => {
      // commit('UPDATE_RECORD_ITEM', res.data) // TODO: SERVER must return updated record item
      // return res.data
      dispatch('getRecordList')
      return record
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
