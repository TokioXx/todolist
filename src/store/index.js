
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as item from './modules/item'
import { STORAGE_KEY } from './types'
import localforage from 'localforage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const recorder = store => {
  store.subscribe((mutation, store) => {
    localforage
      .setItem(STORAGE_KEY, store)
      .catch(err => console.error('[Storage Error]: ', err))
  })
}

export default new Vuex.Store({
  modules: {
    item
  },
  strict: debug,
  plugins: debug ? [createLogger(), recorder] : [recorder]
})
