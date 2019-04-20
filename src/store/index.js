import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import detection from './modules/detection'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    detection
  },
  getters
})

export default store
