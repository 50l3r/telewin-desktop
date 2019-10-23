// eslint-disable-next-line no-undef
const staticPath = __static;

const state = {
	name: null,
	notifications: true,
	paths: {
		minning: 'http://teleguettis.cf', // https://www.ganasdetelepizza.es
		telemetry: 'http://teleguettis.cf',
		static: staticPath,
	},
};

const getters = {
	paths: st => st.paths,
	config: st => st,
};

const mutations = {
	setName(st, name) {
		st.name = name;
	},
	setNotification(st, notifications) {
		st.notifications = notifications;
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
