import { mapGetters } from 'vuex';


export default {
	computed: {
		...mapGetters(['work']),
	},
	methods: {
		// TIMERS
		start() {
			const name = this.$root.verifyName();

			if (name) {
				this.$store.dispatch('startMinning', this);
			}
		},
		stop() {
			this.$store.dispatch('stopMinning');
		},
		toggleMinning() {
			if (this.work) { this.stop(); } else { this.start(); }
		},
	},
};
