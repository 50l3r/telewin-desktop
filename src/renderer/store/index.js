import Vue from 'vue'
import Vuex from 'vuex'

//import { createPersistedState, createSharedMutations } from 'vuex-electron'
import vuexpersistedstate from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import modules from './modules'

const plugins = [vuexpersistedstate({
	key: 'TelewinUser',
	storage: {
		getItem: key => JSON.parse(atob(Cookies.get(key))),
		setItem: (key, value) => Cookies.set(key, btoa(JSON.stringify(value)), { expires: 1}),
		removeItem: key => Cookies.remove(key)
	}
})]

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: plugins,
  strict: process.env.NODE_ENV !== 'production'
})
