const state = {
	proxys: []
}

const mutations = {
	add_proxy (state, proxy) {
		state.proxys.push(proxy)
	},
	del_proxy (state, index) {
		state.proxys.splice(index, 1);
	},
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('add_proxy')
  }
}

export default {
  state,
  mutations,
  actions
}
