<template>
	<div class="sidebar" id="sidebar">
		<div class="container">
			<div class="col-md-12">
				<div class="tab-content">
					<div class="tab-pane fade in active show" id="members">
						<div class="list-group sort">
							<button class="btn filterMembersBtn active show" data-toggle="list" data-filter="all">All</button>
							<button class="btn filterMembersBtn" data-toggle="list" data-filter="online">Online</button>
							<button class="btn filterMembersBtn" data-toggle="list" data-filter="offline">Offline</button>
						</div>
						<div class="contacts">
							<h1>Mineros</h1>
							<div class="list-group" id="contacts" role="tablist">
								<a href="#user-profile" @click="set_profile(item)" class="filterMembers all contact" :class="$parent.online[index]" data-toggle="list" v-for="(item,index) in $parent.users" :key="index">
									<img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+item.ID" data-toggle="tooltip" data-placement="top" :title="item.Nick" alt="avatar">
									<div class="status">
										<i class="material-icons" :class="$parent.online[index]">fiber_manual_record</i>
									</div>
									<div class="data">
										<h5>{{item.Nick}}</h5>
										<p>{{item.Pizzas}} pizzas encontradas</p>
									</div>
									<div class="person-add" >
										<i class="material-icons" :class="working[index]" data-toggle="tooltip" data-placement="top" :title="item.Work==1 ? 'Minando' : ''">donut_large</i>
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
								<img class="avatar-xl" :src="$parent.avatar" alt="avatar">
								<h1><a href="#">{{$parent.user.Nick}}</a></h1>
								<span>#{{$parent.user.ID}}</span>


								<div class="stats">
									<div class="item">
										<h2>{{$parent.user.Pizzas}}</h2>
										<h3>Pizzas</h3>
									</div>
									<div class="item">
										<h2>{{$parent.user.Retries}}</h2>
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
											<p>Cuidado con lo que tocas!!!</p>
										</div>
										<i class="material-icons">keyboard_arrow_right</i>
									</a>
									<div class="collapse" id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionSettings">
										<div class="content layer">

											<form @submit.prevent="change_settings">
												<div class="field">
													<label for="firstName">Dominio de emails</label>
													<input type="text" class="form-control" id="email" placeholder="ej: gmail.com" v-model="config.domain" required>
												</div>
												<div class="history">
													<p>Se generaran correos aleatorios basados en el dominio que especifiques aquí.</p>
												</div>

												<div class="field">
													<label for="firstName">Prefijo de emails</label>
													<input type="text" class="form-control" id="email" placeholder="ej: pre" maxlength="5" v-model="config.domain_prefix" required>
												</div>
												<div class="history">
													<p>Se aplicara el prefijo que selecciones a los emails generados. Usa solo caracteres alfanumericos</p>
												</div>


												<div class="field">
													<label for="firstName">Tiempo entre minado</label>
													<input type="number" class="form-control" id="email" placeholder="Tiempo en milisegundos" v-model="config.time_minning" required>
												</div>
												<div class="history">
													<p v-if="config.time_minning>=10000">Se generaran correos aleatorios basados en el dominio que especifiques aquí.</p>
													<p class="text-danger" v-else>La estas liando. Baneo en 3,2...</p>
												</div>

												<button type="submit" class="btn button w-100">Guardar</button>

												<p v-show="error.domain" class="text-success mt-4 text-center">{{error.domain}}</p>
											</form>
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
													<input type="checkbox" v-model="config.notifications" @change="change_notification">
													<span class="slider round"></span>
												</label>
											</div>
											<p v-show="error.notifications" class="text-success mt-4 text-center">{{error.notifications}}</p>
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
					<!-- End of Settings -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>


export default {
	name: 'sidebar',
	created(){
		$(document).ready(function() {
			$(".filterMembersBtn").click(function() {
				var t = $(this).attr("data-filter");
				$(".filterMembers").not("." + t).fadeOut("fast"), $(".filterMembers").filter("." + t).fadeIn("fast")
			})

			$('[data-toggle="tooltip"]').tooltip()
		})

		this.config.domain = this.$parent.minning.domain
		this.config.domain_prefix = this.$parent.minning.domain_prefix
		this.config.notifications = this.$parent.minning.notifications
		this.config.time_minning = this.$parent.minning.time
	},
	data: () => ({
		config: {
			domain: "",
			domain_prefix: "",
			time_minning: "",
			notifications: true
		},
		error: {
			domain: "",
			notifications: ""
		}
	}),
	computed:{
		working(){
			return this.$parent.users.map(function(item) {
				if(item.Work==1){
					return "text-success rotate"
				}else{
					return ""
				}
			})
		}
	},
	methods: {
		change_notification(){
			var self = this

			this.$store.commit('set_notification',this.config.notifications)
			this.error.notifications = "Notificaciones configuradas correctamente"
			setTimeout(function(){ self.error.domain = "" }, 2000);
		},
		change_settings(){
			var self = this
			if(this.config.time_minning>0){
				this.$store.commit('set_domain',{domain: this.config.domain, prefix: this.config.domain_prefix})
				this.$store.commit('set_time',this.config.time_minning)
				this.error.domain = "Modificaciones guardadas correctamente"
			}else{
				this.error.domain = "El tiempo debe ser mayor a 0"
			}

			setTimeout(function(){ self.error.domain = "" }, 2000);
		},
		set_profile(item){
			this.$parent.profile = item
		}
	}
}
</script>

<style>
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

	@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
	@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
	@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
