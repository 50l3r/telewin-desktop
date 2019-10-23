<template>
	<div class="sidebar" id="sidebar">
		<div class="container">
			<div class="col-md-12">
				<div class="tab-content">
					<div class="tab-pane fade in active show" id="members">
						<div class="list-group sort">
							<button class="btn" @click="filterUsers = 'all'" :class="{'active': filterUsers === 'all'}">All</button>
							<button class="btn" @click="filterUsers = 'online'" :class="{'active': filterUsers === 'online'}">Online</button>
							<button class="btn" @click="filterUsers = 'offline'" :class="{'active': filterUsers === 'offline'}">Offline</button>
						</div>
						<div class="contacts">
							<h1>Mineros</h1>
							<div class="list-group" id="contacts">
								<a href="#user-profile" @click="setProfile(item)" class="filterMembers contact" v-show="filterUsers==='all' | filterUsers===onlineUsers[index]" v-for="(item,index) in users" :key="index">
									<img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+item.ID" :content="item.Nick" v-tippy="{ placement : 'top',  arrow: true }" alt="avatar">
									<div class="status">
										<i class="material-icons" :class="onlineUsers[index]">fiber_manual_record</i>
									</div>
									<div class="data">
										<h5>{{item.Nick}}</h5>
										<p>{{item.Pizzas}} pizzas encontradas</p>
									</div>
									<div class="person-add" >
										<i class="material-icons" :class="{'text-success rotate': onlineUsers[index] === 'online'}" :content="onlineUsers[index] === 'online' ? 'Minando' : 'Vagueando'" v-tippy="{ placement : 'top',  arrow: true }">donut_large</i>
									</div>
								</a>
							</div>
						</div>
					</div>
					<!-- End of Contacts -->

					<!-- Start of Settings -->
					<div class="tab-pane fade" id="settings">
						<div class="settings">
							<div class="profile">
								<img class="avatar-xl" :src="avatar" alt="avatar">
								<h1><a href="#">{{user.Nick}}</a></h1>
								<span>#{{user.ID}}</span>


								<div class="stats">
									<div class="item">
										<h2>{{myPizzas.length}}</h2>
										<h3>Pizzas</h3>
									</div>
									<div class="item">
										<h2>{{retries}}</h2>
										<h3>Intentos</h3>
									</div>

								</div>
							</div>
							<div class="categories" id="accordionSettings">
								<h1>Configuracion</h1>

								<div class="category">
									<a href="#" class="title collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
										<i class="material-icons md-30 online">track_changes</i>
										<div class="data">
											<h5>Mineria</h5>
											<p>Configura las opciones de minado</p>
										</div>
										<i class="material-icons">keyboard_arrow_right</i>
									</a>
									<div class="collapse" id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionSettings">
										<div class="content layer">
											<div class="field">
												<label for="firstName">Cuenta de gmail</label>
												<input type="text" class="form-control" id="email" placeholder="ej: lacasito" v-model="name" required>
											</div>
											<div class="history">
												<p>Especifica tu nombre de gmail.</p>
											</div>
										</div>
									</div>
								</div>
								<!-- End of Chat History -->
								<!-- Start of Notifications Settings -->
								<div class="category">
									<a href="#" class="title collapsed" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
										<i class="material-icons md-30 online">notifications_none</i>
										<div class="data">
											<h5>Notificaciones</h5>
											<p>Enciende o apaga las notificaciones</p>
										</div>
										<i class="material-icons">keyboard_arrow_right</i>
									</a>
									<div class="collapse" id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionSettings">
										<div class="content no-layer">
											<div class="set noborder">
												<div class="details">
													<h5>Notificaciones de escritorio</h5>
													<p>Recibirás una notificacion en el pc en caso de que consigas alguna pizza.</p>
												</div>
												<label class="switch">
													<input type="checkbox" v-model="notifications">
													<span class="slider round"></span>
												</label>
											</div>
										</div>
									</div>
								</div>
								<!-- End of Notifications Settings -->

								<!-- Start of Logout -->
								<div class="category">
									<a class="title collapsed">
										<i class="material-icons md-30 online">power_settings_new</i>
										<div class="data">
											<h5>Power Off</h5>
											<p>Log out of your account</p>
										</div>
										<i class="material-icons">keyboard_arrow_right</i>
									</a>
								</div>
								<!-- End of Logout -->
							</div>
						</div>
					</div>

					<div class="tab-pane fade" id="pizzas">
						<div class="settings">
							<div class="categories" id="accordionSettings">
								<h1>Pizzas conseguidas</h1>

								<table class="table table-pizzas">
									<tbody>
										<tr v-for="(item,index) in myPizzas" :key="index">
											<td valing="middle">
												<img :src="$root.paths.static+'/img/fav.png'"> {{item}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!-- End of Settings -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Sidebar',
	data: () => ({
		filterUsers: 'all',
	}),
	computed: {
		...mapGetters(['user', 'avatar', 'retries', 'myPizzas', 'onlineUsers', 'users']),
		user() {
			return this.$store.getters.user;
		},
		avatar() {
			return this.$store.getters.avatar;
		},
		name: {
			get() { return this.$store.getters.config.name; },
			set(value) {
				this.$store.commit('setName', value);
			},
		},
		notifications: {
			get() { return this.$store.getters.config.notifications; },
			set(value) {
				this.$store.commit('setNotification', value);
			},
		},
	},
	methods: {
		setProfile(item) {
			this.$store.commit('setProfile', item);
		},
	},
};
</script>

<style lang="scss">
	.noborder{
		border: 0 !important;
	}

	.sidebar .contacts .contact .status .online, .sidebar .contacts .contact.active .material-icons{
		color: #28a745;
	}

	.rotate{
		-webkit-animation:spin 4s linear infinite;
		-moz-animation:spin 4s linear infinite;
		animation:spin 4s linear infinite;
	}

	.table-pizzas{
		td{
			display: flex;
			align-items: center;
			padding-left: 0;
			padding-right: 0;
			color: white;
			border-top: 1px solid rgba(0,0,0,0.3);

			img{
				width: 30px;
				height: 30px;
				display: inline-block;
				margin-right: 10px;
			}
		}
	}

	@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
	@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
	@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
