const state = {
	minning: {
		domain: "gmail.com",
		domain_prefix: "tele",
		time: 10000,
		time_pizzas: 60000,
		notifications: true
	}
}

const mutations = {
	set_domain (state, data) {
		state.minning.domain = data.domain
		state.minning.domain_prefix = data.prefix
	},
	set_time (state, time) {
		if(time>0){
			state.minning.time = time
		}
	},
	set_notification (state, notifications) {
		state.minning.notifications = notifications
	}
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('set')
  }
}

export default {
  state,
  mutations,
  actions
}
