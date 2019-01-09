import Vue from 'vue'
import axios from 'axios'

import app from './app'
import router from './router'
import store from './store'

import moment from 'moment'
import vue_moment from 'vue-moment'
moment.locale("es")

/////////////////
// AXIOS
/////////////////
// axios.create(() => {
// 	return {
// 		method: 'post',
// 		url: '',
// 		responseType: 'json',
// 		data: {},
// 		params: {},
// 		withCredentials: true,
// 		transformRequest: [function (data) {
// 			return data;
// 		}],
// 		transformResponse: [function (data) {
// 			return data;
// 		}]
// 	}
// })

axios.interceptors.response.use((response) => {
	return response;
}, (error) => {
	return Promise.reject(error.response)
});


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(vue_moment, {moment})


//ROUTER
router.beforeEach((to, from, next) => {
	const authRequired = to.matched.some((route) => route.meta.auth)
	const authed = store.state.Auth.user

	if (authRequired && !authed) {
		next('/login')
	} else if(to.name=="login" && authed) {
		next('/')
	}else{
		next()
	}
})

/* eslint-disable no-new */
new Vue({
  components: { app },
  data() {
	return {
		paths: {
			minning: "https://www.ganasdetelepizza.es",
			telemetry: "http://teleguettis.cf",
			static: __static
		}
	}
  },
  router,
  store,
  template: '<router-view></router-view>'
}).$mount('main')
