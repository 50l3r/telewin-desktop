/* eslint-disable no-shadow */
import moment from 'moment';

const state = {
	busy: false,
	work: false,
	pizzasRemain: 1000,
	myPizzas: [],
	allPizzas: [],
	retries: 0,
	users: [],
	profile: null,
	timers: {
		pizzas: null,
		online: null,
		minning: null,
	},
	timings: {
		pizzas: 60000,
		online: 15000,
		minning: 1000,
	},
};

const getters = {
	busy: st => st.busy,
	work: st => st.work,
	myPizzas: st => st.myPizzas,
	allPizzas: st => st.allPizzas,
	retries: st => st.retries,
	users: st => st.users,
	profile: st => st.profile,
	pizzasRemain: st => st.pizzasRemain,
	onlineUsers: st => st.users.map((item) => {
		const fecha1 = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
		const fecha2 = moment(item.LastLogin, 'YYYY-MM-DD HH:mm:ss');

		const diff = fecha1.diff(fecha2, 'm');

		if (diff > 15) {
			return 'offline';
		}

		return 'online';
	}),
};

const mutations = {
	setBusy(st, busy) {
		st.busy = busy;
	},
	setWork(st, work) {
		st.work = work;
	},
	retriesSum(st) {
		st.retries += 1;
	},
	setRemainPizzas(st, pizzas) {
		st.pizzasRemain = pizzas;
	},
	setAllPizzas(st, pizzas) {
		st.allPizzas = pizzas;
	},
	addMyPizza(st, pizza) {
		st.myPizzas.push(pizza);
	},
	setMyPizzas(st, pizzas) {
		st.myPizzas = pizzas;
	},
	setUsers(st, users) {
		st.users = users;
	},
	setTimer(st, { type, job }) {
		st.timers[type] = job;
	},
	cleanTimers(st) {
		clearInterval(st.timers.online);
		clearInterval(st.timers.pizzas);
		clearTimeout(st.timers.minning);

		st.timers = {
			pizzas: null,
			online: null,
			minning: null,
		};
	},
	cleanMinningTimer(st) {
		clearTimeout(st.timers.minning);
		st.timers.minning = null;
	},
	setProfile(st, profile) {
		st.profile = profile;
	},
};

const actions = {
	async online({ getters, commit }, vm) {
		try {
			const Data = {
				nick: getters.user.Nick,
				secret: getters.user.Secret,
				retries: getters.retries,
			};

			const response = await vm.$http.post(`${vm.$root.paths.telemetry}/online.php`, new URLSearchParams(Data));

			commit('setAllPizzas', response.data.message.pizzas);
			commit('setUsers', response.data.message.users);

			const pizzas = [];

			response.data.message.pizzas.forEach((item) => {
				if (parseInt(item.ID, 10) === parseInt(getters.user.ID, 10)) {
					pizzas.push(item.EmailWin);
				}
			});
			commit('setMyPizzas', pizzas);

			return true;
		} catch (error) {
			console.log(error);
			vm.$root.parseError('home', error);
		}

		return false;
	},
	async pizzaCount({ commit }, vm) {
		const response = await vm.$http.get(`${vm.$root.paths.minning}/data.json`);
		commit('setRemainPizzas', response.data.prizesEnable);
	},
	async minning({ state, commit, dispatch }, vm) {
		if (!state.busy && state.work) {
			try {
				commit('setBusy', true);

				const email = vm.$root.randomMail();
				const checkMail = await dispatch('checkMail', { email, vm });

				if (checkMail === 'EMAIL_SAVED') {
					const isWinner = await dispatch('checkWin', { email, vm });

					if (isWinner === 'USER_IS_WINNER') {
						await dispatch('submitWin', { email, vm });
						vm.$root.toast(`Acabas de encontrar una pizza con el email: ${email}`, 'success');
					} else if (isWinner === 'FORBIDDEN') {
						vm.$root.toast('Es posible que tu ip este bloqueada.', 'primary');
						commit('setWork', false);
						commit('cleanMinningTimer');
						return false;
					}

					commit('retriesSum');
				} else if (checkMail === 'FORBIDDEN	') {
					vm.$root.toast('Es posible que tu ip este bloqueada.', 'primary');
					commit('setWork', false);
					commit('cleanMinningTimer');
					return false;
				}

				commit('setBusy', false);

				setTimeout(() => { dispatch('minning', vm); }, state.timings.minning);
			} catch (error) {
				commit('setBusy', false);
				setTimeout(() => { dispatch('minning', vm); }, state.timings.minning);
				vm.$root.parseError('third', error);
			}
		}

		return true;
	},
	// eslint-disable-next-line no-unused-vars
	async checkMail({ state }, { email, vm }) {
		try {
			const params = {
				email,
				receive_offert: false,
			};

			const response = await vm.$http.post(`${vm.$root.paths.minning}/check-mail`, params);
			return response.data.responseMessage;
		} catch (error) {
			vm.$root.parseError('third', error);
		}

		return false;
	},
	// eslint-disable-next-line no-unused-vars
	async checkWin({ state }, { email, vm }) {
		try {
			const response = await vm.$http.post(`${vm.$root.paths.minning}/check-prize`, { email });
			return response.data.responseMessage;
		} catch (error) {
			vm.$root.parseError('third', error);
		}

		return false;
	},
	async submitWin({ getters, commit }, { email, vm }) {
		try {
			const params = {
				id: getters.user.ID,
				email,
				secret: getters.user.Secret,
			};

			await vm.$http.post(`${vm.$root.paths.telemetry}/win.php`, new URLSearchParams(params));

			commit('addMyPizza', email);

			return true;
		} catch (error) {
			vm.$root.parseError('home', error);
		}

		return false;
	},
	startTelemetry({ commit, dispatch }, vm) {
		dispatch('online', vm);
		commit('setTimer', {
			type: 'online',
			job: setInterval(() => { dispatch('online', vm); }, state.timings.online),
		});
	},
	startPizzaCount({ commit, dispatch }, vm) {
		dispatch('pizzaCount', vm);
		commit('setTimer', {
			type: 'pizzas',
			job: setInterval(() => { dispatch('pizzaCount', vm); }, state.timings.pizzas),
		});
	},
	startMinning({ commit, dispatch }, vm) {
		commit('setWork', true);
		commit('setTimer', {
			type: 'minning',
			job: setTimeout(() => { dispatch('minning', vm); }, state.timings.minning),
		});
	},
	stopMinning({ commit }) {
		commit('setWork', false);
		commit('cleanMinningTimer');
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
