<template>
	<div>
		<div id="topbar"></div>
		<div class="layout" id="main">
			<navigation></navigation>
			<sidebar></sidebar>

			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import '@/assets/css/lib/bootstrap.min.css'
import '@/assets/css/swipe.css'
import '@/assets/css/dark.css'

import 'popper.js'
import 'bootstrap';

import sidebar from '@/components/sidebar.vue'
import navigation from '@/components/navigation.vue'

export default {
	name: 'app',
	data() {
		return {
			users: [],
			pizzas: [],
			user: this.$store.state.Auth.user,
			minning: this.$store.state.Config.minning,
			proxys: this.$store.state.Navigation.proxys,
			profile: null
		}
	},
	computed: {
		avatar() {
			return this.$root.paths.telemetry + "/avatar.php?id=" + this.user.ID
		},
		online() {
			var self = this
			return this.users.map(function(item) {
				var fecha1 = self.$moment(new Date(), "YYYY-MM-DD HH:mm:ss");
				var fecha2 = self.$moment(item.LastLogin, "YYYY-MM-DD HH:mm:ss");

				var diff = fecha1.diff(fecha2, 'm');

				if (diff > 15) {
					return "offline"
				} else {
					return "online"
				}

			})
		},
	},
	components: {
		"sidebar": sidebar,
		"navigation": navigation
	}
}
</script>

<style>
#topbar {
	width: 100%;
	-webkit-user-select: none;
	-webkit-app-region: drag;
	position: absolute;
	top: 0;
	left: 0;
	height: 40px;
}

main {
	width: 100%;
}
</style>
