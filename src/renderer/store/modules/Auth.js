const state = {
	user: null
}

const mutations = {
	login (state, user) {
		if(user){
			state.user = user
		}
	},
	logout (state) {
		state.user = null
	},
	retries_sum(state){
		state.user.Retries++
	},
	retries(state, retries){
		state.user.Retries = retries
	},
	pizzas_sum(state){
		state.user.Pizzas++
	},
	pizzas(state, pizzas){
		state.user.Pizzas = pizzas
	}
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('login')
  }
}

export default {
  state,
  mutations,
  actions
}
