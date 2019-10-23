import main from './main.vue';

import {
	Vue, router, store, errors, emails,
} from './config/vue';

new Vue({
	mixins: [errors, emails],
	computed: {
		paths() {
			return this.$store.getters.paths;
		},
	},
	router,
	store,
	template: '<router-view></router-view>',
	render: h => h(main),
}).$mount('#app');
