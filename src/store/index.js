import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import modules from './modules';

const plugins = [
	createPersistedState({
		key: 'TelewinAuth',
		paths: [
			'Auth',
			'Config',
		],
	}),
	createPersistedState({
		key: 'TelewinMinning',
		paths: [
			'Minning',
		],
		storage: window.sessionStorage,
	}),
];

Vue.use(Vuex);

export default new Vuex.Store({
	modules,
	plugins,
	strict: process.env.NODE_ENV !== 'production',
});
