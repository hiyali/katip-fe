import Vue from 'vue'

const state = {
  records: {
    loaded: false,
    skip: 0,
    limit: 20,
    list: undefined
    /* Simple mock for test
    [
      {
        id: 1,
        title: 'salam',
        type: 'TEXT',
        content: 'text-haaha'
      },
      {
        id: 2,
        title: 'asdfadsf',
        type: 'PASSWORD',
        content: 'non-secure'
      },
      {
        id: 3,
        title: 'password',
        type: 'PASSWORD',
        content: 'non-213123'
      }
    ]
    */
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
  selectedType: null,
  searchTitle: ''
}

const getters = {
  records: state => {
    let filteredRecords
    if (state.records.list && state.records.list.length > 0) {
      if (state.selectedType) {
        filteredRecords = {
          ...state.records,
          ...{
            list: state.records.list.filter(record => record.type === state.selectedType)
          }
        }
      }
      if (state.searchTitle) {
        filteredRecords = {
          ...state.records,
          ...{
            list: (filteredRecords || state.records).list.filter(record => record.title.indexOf(state.searchTitle) > -1)
          }
        }
      }
      if (filteredRecords) {
        return filteredRecords
      }
    }

    return state.records
  },
  types: state => state.types
}

const mutations = {
  SET_RECORDS_LIST (state, data) {
    state.records = {
      ...state.records,
      ...{
        loaded: data.length < state.records.limit,
        skip: 0,
        list: data
      }
    }
  },
  CONCAT_RECORDS_LIST (state, data) {
    state.records.list.push(data)
    state.records.loaded = data.length < state.records.limit
    state.records.skip = state.records.skip + state.records.limit
  },
  SET_SELECTED_TYPE (state, type) {
    if (state.selectedType !== type) {
      state.selectedType = type
    } else {
      state.selectedType = null
    }
  },
  SET_SEARCH_TITLE (state, searchTitle) {
    state.searchTitle = searchTitle
  }
}

const actions = {
  getRecordsList ({ state, commit }, params) {
    Vue.http.get('/records', params = { skip: state.records.skip, limit: state.records.limit }).then((res) => {
      if (params.skip > 0) {
        commit('CONCAT_RECORDS_LIST', res.data)
      } else {
        commit('SET_RECORDS_LIST', res.data)
      }
    })
  },
  filterByType ({ commit }, type) {
    commit('SET_SELECTED_TYPE', type)
  },
  searchByTitle ({ commit }, title) {
    commit('SET_SEARCH_TITLE', title)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
