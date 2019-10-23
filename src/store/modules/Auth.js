/* eslint-disable no-shadow */

const state = {
	user: null,
};

const getters = {
	isOnline: st => !!st.user,
	user: st => st.user,
	avatar: (st, getters) => (getters.isOnline ? `${getters.paths.telemetry}/avatar.php?id=${st.user.ID}` : null),
};

const mutations = {
	login(st, user) {
		st.user = {
			ID: user.ID,
			Email: user.Email,
			Nick: user.Nick,
			Secret: user.Secret,
		};

		st.retries = user.Retries;
	},
	logout(st) {
		st.user = null;
	},
};

const actions = {

};

export default {
	state,
	getters,
	mutations,
	actions,
};
