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
import sidebar from '@/components/sidebar.vue';
import navigation from '@/components/navigation.vue';

export default {
	name: 'App',
	components: {
		sidebar,
		navigation,
	},
	data() {
		return {

		};
	},
	beforeDestroy() {
		this.$store.commit('cleanTimers');
	},
	destroyed() {
		this.$store.commit('cleanTimers');
	},
	mounted() {
		this.$store.commit('setBusy', false);
		this.$store.commit('setWork', false);
		this.$store.commit('cleanMinningTimer');

		this.$store.dispatch('startTelemetry', this);
		this.$store.dispatch('startPizzaCount', this);
	},
};
</script>

<style>

</style>
