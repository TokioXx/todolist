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
      return item.createdAt >= moment().startOf('day') && item.createdAt <= moment().endOf('day')
    }).sort(item => item.done)
  },
  completedItems (state, getters) {
    return getters.items.filter(item => item.done && item.createdAt < moment().startOf('day'))
  },
  uncompletedItems (state, getters) {
    return getters.items.filter(item => !item.done && item.createdAt < moment().startOf('day'))
  }
}

let state = { active: null, items: {} }

const mutations = {
  [types.ITEMS_SET] (s, items) {
    Vue.set(state, 'items', items)
  },
  [types.ITEM_CREATE] (s, { content, expire, done = false }) {
    Vue.set(s.items, uuid(), {
      createdAt: new Date(),
      updatedAt: new Date(),
      content,
      expire,
      done
    })
  },
  [types.ITEM_UPDATE] (state, item) {
    Vue.set(state.items, item.id, Object.assign(item, { updatedAt: new Date() }))
  },
  [types.ITEM_DELETE] (state, id) {
    Vue.delete(state.items, id)
  },
  [types.ITEM_ACTIVE] (state, id) {
    if (id !== null) console.assert(state.items[id], `Try to active nonexist item [${id}]`)
    Vue.set(state, 'active', id)
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
