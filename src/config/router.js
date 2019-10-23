import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: '',
		component: require('@/components/app').default,
		meta: {
			auth: true,
		},
		children: [
			// ////////////////////////////////
			// / CONFIG
			// ////////////////////////////////
			{
				name: 'dashboard',
				path: '',
				component: require('@/components/dashboard/dashboard').default,
				meta: {
					meta: {
						auth: true,
					},
				},
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: require('@/components/login').default,
		meta: {
			auth: false,
		},
	},
	{
		path: '*',
		redirect: '/',
	},
];

const router = new VueRouter({
	routes,
});

router.beforeEach((to, from, next) => {
	const authRequired = to.matched.some(route => route.meta.auth);
	const authed = store.getters.isOnline;

	if (authRequired && !authed) {
		next('/login');
	} else if (to.name === 'login' && authed) {
		next('/');
	} else {
		next();
	}
});


export default router;
