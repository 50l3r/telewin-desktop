<template>
	<div class="navigation">
		<div class="container">
			<div class="inside">
				<div class="nav nav-tab menu">
					<button class="btn"><img class="avatar-xl" :src="$parent.avatar" alt="avatar"></button>
					<a href="#members" data-toggle="tab" class="f-grow1"><i class="material-icons active">account_circle</i></a>
					<!-- <a href="#proxys" data-toggle="tab" class="f-grow1"><i class="material-icons active">pregnant_woman</i></a> -->

					<a href="#settings" data-toggle="tab"><i class="material-icons">settings</i></a>
					<button class="btn" @click="minimize"><i class="material-icons">play_for_work</i></button>
					<button class="btn power" @click="exit"><i class="material-icons">power_settings_new</i></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const remote = require('electron').remote
let w = remote.getCurrentWindow()
export default {
	name: 'sidebar',
	data: () => ({
		window: w
	}),
	methods: {
		exit(){
			this.$store.commit('logout')
			w.close()
		},
		minimize(){
			w.minimize()
		}
	}
}
</script>

<style>
	.navigation{
		background: #E2001A;
	}

	.navigation .inside .menu .material-icons.active, .navigation .inside .menu .material-icons{
		color: white;
		z-index: 99;
	}

	.navigation .inside .menu .avatar-xl{
		border:3px solid white;
	}
</style>
