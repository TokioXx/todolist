import uuid from 'uuid/v4'
import Vue from 'vue'
import * as types from '../types'
import localforage from 'localforage'
import moment from 'moment'

const getters = {
  items () {
    return Object.keys(state.items).map(key => ({ id: key, ...state.items[key] })) || []
  },
  todayItems (state, getters) {
    return getters.items.filter(item => {
      return item.created_at >= moment().startOf('day') && item.created_at <= moment().endOf('day')
    })
  },
  completedItems (state, getters) {
    return getters.items.filter(item => item.done)
  },
  uncompletedItems (state, getters) {
    return getters.items.filter(item => !item.done)
  }
}

let state = { items: {} }

const mutations = {
  [types.ITEMS_SET] (s, items) {
    Vue.set(state, 'items', items)
  },
  [types.ITEM_CREATE] (s, { content, expire, done = false }) {
    Vue.set(s.items, uuid(), {
      created_at: new Date(),
      updated_at: new Date(),
      content,
      expire,
      done
    })
  },
  [types.ITEM_UPDATE] (state, { id, content, expire, done }) {
    Vue.set(state.items, id, { content, expire, done, updated_at: new Date() })
  },
  [types.ITEM_DELETE] (state, id) {
    Vue.delete(state.items, id)
  }
}

// const namespace = true
const actions = {
  [types.ACTION_ITEM_INIT] ({ commit }) {
    localforage.getItem(types.STORAGE_KEY).then(value => {
      const s = value.item || { items: {} }
      commit(types.ITEMS_SET, s.items)
    })
  }
}

export {
  // namespace,
  getters,
  state,
  actions,
  mutations
}
