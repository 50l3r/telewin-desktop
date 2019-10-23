<template>
	<main>
		<div class="main">
			<div class="tab-content" id="nav-tabContent">
				<div class="chat tab-pane fade show active" id="minning" role="tabpanel" aria-labelledby="minning">
					<div class="top">
						<div class="container">
							<div class="col-md-12">
								<div class="inside">
									<div class="data">
										<h5><a href="#">Top Mineros</a></h5>
										<span>Quedan <b class="text-danger">{{pizzasRemain}}</b> pizzas - Conseguidas: <b class="text-warning">{{allPizzas.length}}</b></span>
									</div>

									<a href="#" v-for="(item,index) in topMinners" :key="index">
										<img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+item.ID"  v-tippy="{ placement : 'top',  arrow: true }" :content="item.Nick+': '+item.Pizzas" alt="avatar">
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="content" id="content">
						<div class="container">
							<div class="col-md-12">
								<div class="message" :class="{'me':itsme(item.ID)}" v-for="(item,index) in allPizzas"  :key="index">
									<img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+item.ID" :content="item.Nick"  v-tippy="{ placement : 'top',  arrow: true }" alt="avatar">

									<div class="text-main">
										<h6 class="text-white" v-if="!itsme(item.ID)">{{item.Nick}} ha encontrado 1 pizza</h6>
										<h6 class="text-success text-right" v-else>Has encontrado 1 pizza</h6>

										<span>Hace {{item.Date | moment("from", "now", true)}} <small class="text-warning">{{item.EmailWin}}</small></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="col-md-12">
							<div class="bottom">
								<div class="position-relative w-100">
									<h4 v-show="!work" class="mt-4">Sacude al minero para empezar</h4>
									<h4 v-show="work" class="mt-4"><span class="text-warning">Intentos: {{retries}}</span> - <span class="text-success">Pizzas: {{myPizzas.length}}</span></h4>
								</div>
								<label>
									<a @click="toggleMinning"><img class="minning" :src="minningBtn" /></a>
								</label>
							</div>
						</div>
					</div>
				</div>

				<div class="chat tab-pane fade" id="user-profile" role="tabpanel" aria-labelledby="user-profile" v-if="profile">
					<div class="top">
						<div class="container">
							<div class="col-md-12">
								<div class="inside">
									<a @click="close_profile" class="btn d-md-block d-none"><i class="material-icons md-30">arrow_back</i></a>

									<a href="#minning"><img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+profile.ID" :content="profile.Nick" v-tippy="{ placement : 'top',  arrow: true }" alt="avatar"></a>

									<div class="data">
										<h5>{{profile.Nick}}</h5>
										<span>Minero</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="content empty">
						<div class="container">
							<div class="col-md-12">
								<div class="profile">
									<img class="avatar-profile img-fluid mx-auto d-block" :src="$root.paths.telemetry+'/avatar.php?id='+profile.ID" alt="avatar">

									<h1 class="text-center"><a href="#">{{profile.Nick}}</a></h1>

									<div class="row">
										<div class="col text-center">
											<h2>{{profile.Pizzas}}</h2>
											<h3>Pizzas</h3>
										</div>
										<div class="col  text-center">
											<h2>{{profile.Retries}}</h2>
											<h3>Intentos</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { mapGetters } from 'vuex';

import minning from './mixins/_mining';

export default {
	mixins: [minning],
	name: 'Dashboard',
	data: () => ({
		content_end: true,
	}),
	computed: {
		...mapGetters(['allPizzas', 'retries', 'user', 'profile', 'pizzasRemain', 'myPizzas']),
		minningBtn() {
			if (this.work) {
				return `${this.$root.paths.static}/img/minning.gif`;
			}
			return `${this.$root.paths.static}/img/minning_stop.png`;
		},
		topMinners() {
			const tops = this.$store.getters.users.slice(0);
			tops.sort((a, b) => b.Pizzas - a.Pizzas);

			return tops.slice(0, 5);
		},
	},
	async created() {
		// if (this.content_end) {
		// 	const container = this.$el.querySelector('#content');
		// 	container.scrollTop = container.scrollHeight;
		// }
	},
	mounted() {
		const self = this;
		$('#content').on('scroll', () => {
			if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
				self.content_end = true;
			} else {
				self.content_end = false;
			}
		});
	},
	methods: {
		// PERFIL
		close_profile() {
			$('#user_profile').removeClass('active show');
			$('#minning').addClass('active show');
		},
		itsme(id) {
			if (id === this.$store.getters.user.ID) {
				return true;
			}
			return false;
		},
	},
};

</script>

<style>

</style>
