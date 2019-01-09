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
										<span>Quedan <b class="text-danger">{{pizzas_now}}</b> pizzas</span>
									</div>

									<a href="#" v-for="(item,index) in top_minners" :key="index">
										<img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+item.ID" data-toggle="tooltip" data-placement="top" :title="item.Nick+':'+item.Pizzas" :data-original-title="item.Nick+': '+item.Pizzas" alt="avatar">
									</a>

								</div>
							</div>
						</div>
					</div>
					<div class="content" id="content">
						<div class="container">
							<div class="col-md-12">
								<div class="message" :class="{'me':itsme(item.ID)}" v-for="(item,index) in $parent.pizzas"  :key="index">
									<img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+item.ID" data-toggle="tooltip" data-placement="center" :title="item.Nick" alt="avatar">

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
									<h4 v-show="work" class="mt-4"><span class="text-warning">Intentos: {{$parent.user.Retries}}</span> - <span class="text-success">Pizzas: {{$parent.user.Pizzas}}</span></h4>
								</div>
								<label>
									<a @click="toggle_minning"><img class="minning" :src="minning_btn" /></a>
								</label>
							</div>
						</div>
					</div>
				</div>

				<div class="chat tab-pane fade" id="user-profile" role="tabpanel" aria-labelledby="user-profile" v-if="$parent.profile">
					<div class="top">
						<div class="container">
							<div class="col-md-12">
								<div class="inside">
									<a @click="close_profile" class="btn d-md-block d-none"><i class="material-icons md-30">arrow_back</i></a>

									<a href="#minning"><img class="avatar-md" :src="$root.paths.telemetry+'/avatar.php?id='+$parent.profile.ID" data-toggle="tooltip" data-placement="top" :title="$parent.profile.Nick" alt="avatar"></a>

									<div class="data">
										<h5>{{$parent.profile.Nick}}</h5>
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
									<img class="avatar-profile img-fluid mx-auto d-block" :src="$root.paths.telemetry+'/avatar.php?id='+$parent.profile.ID" alt="avatar">

									<h1 class="text-center"><a href="#">{{$parent.profile.Nick}}</a></h1>

									<div class="row">
										<div class="col text-center">
											<h2>{{stat_pizzas}}</h2>
											<h3>Pizzas</h3>
										</div>
										<div class="col  text-center">
											<h2>{{stat_retries}}</h2>
											<h3>Intentos</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="chat chat-bottom tab-pane fade" id="proxys" role="tabpanel" aria-labelledby="proxys">
					<div class="top">
						<div class="container">
							<div class="col-md-12">
								<div class="inside">
									<a @click="close_profile" class="btn d-md-block d-none"><i class="material-icons md-30">arrow_back</i></a>

									<div class="data">
										<h5><a href="#">Lista de proxys</a></h5>
										<span>Pfff jajajaja</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="content" id="content">
						<div class="container">
							<div class="col-md-12">
								<table class="table table-dark">
									<thead>
										<tr>
											<th>IP</th>
											<th>Puerto</th>
											<th class="text-center">Acciones</th>
										</tr>
									</thead>

									<tbody>
										<tr v-for="(item,index) in $parent.proxys" :key="index">
											<td>{{item.ip}}</td>
											<td>{{item.port}}</td>
											<td class="text-center"><a @click="del_proxy(index)" class="text-danger pointer">Eliminar</a></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="container">
						<div class="col-md-12">
							<div class="bottom">
								<form @submit.prevent="add_proxy">
									<div class="row">
										<div class="col-4">
											<div class="field">
												<label for="ip"><b>IP del proxy</b></label>
												<input type="text" class="form-control" id="ip" placeholder="IP del proxy" value="65.12.51.23" v-model="proxy.ip" required>
											</div>
										</div>
										<div class="col-4">
											<div class="field">
												<label for="puerto"><b>Puerto</b></label>
												<input type="number" class="form-control" id="puerto" placeholder="IP del puerto" value="22123" v-model="proxy.port" required>
											</div>
										</div>
										<div class="col-4 ">
											<label for="puerto"><b>&nbsp;</b></label>
											<button type="submit" class="btn button w-100">Añadir</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>

export default {
	name: 'dashboard',
	data: () => ({
		busy: false,
		work: false,
		check_online: 15000,
		timer_minning: null,
		timer_pizzas: null,
		notifier: require("node-notifier"),
		content_end: true,
		pizzas_now: 1000,
		proxy: {
			ip: "",
			port: ""
		}

	}),
	computed:{
		minning_btn(){
			if(this.work){
				return this.$root.paths.static+"/minning.gif"
			}else{
				return this.$root.paths.static+"/minning_stop.png"
			}
		},
		top_minners(){
			var tops = this.$parent.users.slice(0);
			tops.sort(function(a,b) {
				return b.Pizzas - a.Pizzas;
			});

			return tops.slice(0,5)
		},
		stat_pizzas(){
			return this.$parent.user.Pizzas
		},
		stat_retries(){
			return this.$parent.user.Retries
		}
	},
	created(){
		var self = this
		self.online()
		self.pizzas_remain()
		this.timer_online = setInterval(function(){self.online()},self.check_online)
		this.timer_pizzas = setInterval(function(){self.pizzas_remain()}, self.$parent.minning.time_pizzas);
	},
	mounted(){
		var self = this
		$('#content').on('scroll', function() {
			if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
				self.content_end = true
			}else{
				self.content_end = false
			}
		})
	},
	beforeDestroy(){
		clearInterval(this.timer_online)
		clearInterval(this.timer_pizzas)
		clearTimeout(this.timer_minning)
	},
	destroyed(){
		clearInterval(this.timer_online)
		clearInterval(this.timer_pizzas)
		clearTimeout(this.timer_minning)
	},
	methods: {
		//TIMERS
		start(){
			var self = this
			this.work = true

			this.timer_minning = window.setTimeout(function(){self.minning()}, self.$parent.minning.time);
		},
		stop(){
			this.work = false
			clearTimeout(this.timer_pizzas)
		},
		toggle_minning(){
			if(this.work){this.stop()}else{this.start()}
		},
		//PETICIONES
		async minning(){
			var self = this

			if(!this.busy && this.work){
				try{
					this.busy = true

					var Data = {
						email: this.random_mail(),
						receive_offert: false,
					}

					var response = await this.$http.post(self.$root.paths.minning+'/check-mail', Data)
					var data = JSON.parse(response.data.body)

					switch(data.responseMessage) {
						case 'EMAIL_SAVED':
							var Subdata = {
								email: Data.email,
							}

							var subresponse = await this.$http.post(self.$root.paths.minning+'/check-prize', Subdata)
							var subdata = JSON.parse(subresponse.data.body)

							switch(subdata.responseMessage) {
								case 'USER_IS_WINNER':
									var SubsubData = {
										id: this.$parent.user.ID,
										email: Subdata.email,
										secret: this.$parent.user.Secret,
									}

									await this.$http.post(this.$root.paths.telemetry+'/win.php',new URLSearchParams(SubsubData))

									this.$store.commit('pizzas_sum')

									if(this.$parent.minning.notifications){
										this.notifier.notify({
											message: "Acabas de encontrar una pizza con el email: "+Subdata.email,
											title: "Pizza encontrada",
											sound: true,
											icon : __dirname+"/../assets/img/resources/fav.png",
											wait:true
										});
									}
								break;

								case 'USER_NOT_WIN':

								break;
							}

							this.$store.commit('retries_sum')
						break;

						case 'FORBIDDEN':
							this.notifier.notify({
								message: "La IP ha alcanzado el numero maximo de intentos. Prueba en un rato de nuevo o con otra IP",
								title: "Malas noticias",
								sound: true,
								icon : __dirname+"/../assets/img/resources/fav.png",
								wait:true
							});

							this.stop()
						break;

						default:

					}

					this.busy = false
					window.setTimeout(() => {self.minning()}, self.$parent.minning.time);

				} catch(error) {
					if(typeof error.status!=="undefined"){
						if(error.status==403){
							this.notifier.notify({
								message: "Es posible que tu ip este bloqueada. Revisa tus privilegios",
								title: "Tengo malas noticias para ti",
								sound: true,
								icon : __dirname+"/../assets/img/resources/fav.png",
								wait:true
							});
						}
					}

					this.busy = false
					window.setTimeout(() => {self.minning()}, self.$parent.minning.time);
				}
			}
		},
		async online() {
			var self = this

			try{

				var Data = {
					nick: this.$parent.user.Nick,
					secret: this.$parent.user.Secret,
					retries: this.$parent.user.Retries,
					work: this.work ? 1 : 0
				}

				var response = await this.$http.post(this.$root.paths.telemetry+'/online.php',new URLSearchParams(Data))

				this.$parent.users = response.data.message.users
				this.$parent.pizzas = response.data.message.pizzas


				response.data.message.users.forEach((item) => {
					if(item.ID == this.$parent.user.ID){
						this.$store.commit('pizzas', item.Pizzas)
					}
				})

				if(this.content_end){
					var container = this.$el.querySelector("#content");
					container.scrollTop = container.scrollHeight;
				}
			} catch(error) {

				return false
			}
		},
		async pizzas_remain(){
			try{
				var response = await this.$http.get(this.$root.paths.minning+'/data.json')

				this.pizzas_now = response.data.prizesEnable
			} catch(error) {

				return false
			}
		},
		//GENERAR MAIL
		random_mail(){
			var adj = ["crack", "fiera", "mostro", "animal", "maquina", "gigante", "artista", "titan", "caiman", "tiranosaurio", "superman", "prenda", "semental", "ninja", "figura", "genio", "tsunami", "leon", "terminator", "goliat", "terremoto", "tigre", "vaquero", "tanque", "mole", "samurai", "coloso", "paladin", "willyrex", "lobezno", "velociraptor", "espectro", "vikingo", "godzilla", "cazadecombate", "campeon", "adamantium", "robocop", "zeus", "capitan", "kingkong", "depredador", "tornado", "monstertruck", "presa", "canario", "johnny", "bravo", "mastodonte", "coronel", "heroe", "canallita", "champion", "jefe", "chulazo", "truhan", "maquinola"]

			var job = ["ninja", "jefe", "cocinero", "mago", "caballo", "arcoiris", "laser", "junior", "conejo", "capitan", "nibblets", "tortita", "zanahoria", "gnomo", "glitter", "patata", "ensalada", "tomillo", "cortinas", "abeja", "baño", "exorcista", "figurita", "huevos", "oceano", "dragones", "chuches", "pipas", "muñeca", "arbusto", "galleta", "manzanas", "helado", "guitarra", "pistola", "flauta", "cantante", "circo", "trampoline", "telon", "carnaval", "locomotora", "globo", "mantis", "animador", "artesano", "artista", "pintor", "tatuador", "tendero", "director", "diseñador", "fotografo", "estilista", "lider", "lira", "maquina", "modelo", "musico", "lapiz", "productor", "cineasta", "decorado", "pizarra", "profe", "mecanico", "barbero", "boli", "gorro", "azafata", "bombero", "mantenimiento", "maestro", "educador", "panel", "patente", "operador", "plumero", "relleno", "tienda", "jabon", "estacion", "sillon", "carpintero"];

			var radji = Math.floor(Math.random() * adj.length)
			var rjob = Math.floor(Math.random() * job.length)
			var random_year = parseInt(Math.random() * (2015 - 1960) + 1960)

			var name = this.$parent.minning.domain_prefix+job[rjob]+adj[radji]+random_year;
			if(name.length>30){
				name = name.substr(0,29);
			}

			var domain = name+"@"+this.$parent.minning.domain
			return domain.replace(/ /g, "").replace(/[_-]/g, " ")
		},
		//PERFIL
		close_profile(){
			$("#user_profile").removeClass("active show")
			$("#minning").addClass("active show")
		},
		itsme(id){
			if(id==this.$store.state.Auth.user.ID){
				return true
			}else{
				return false
			}
		},
		add_proxy(){
			this.$store.commit('add_proxy', {ip: this.proxy.ip, port: this.proxy.port})
		},
		del_proxy(index){
			this.$store.commit('del_proxy', index)
		},
	}
}

</script>

<style>
	html,body{
		overflow: hidden;
	}

	.main .chat .content .message {
		border-bottom: 2px solid #323135;
		padding-bottom: 20px;
	}

	.main .chat .content .message:last-child {
		border-bottom: 0px solid #323135;
		padding-bottom: 0px;
	}

	.btn-success {
		color: #fff !important;
		background-color: #28a745  !important;
		border-color: #28a745  !important;
	}

	.minning{
		height: 80px;
		cursor: pointer;
	}

	.pointer{
		cursor: pointer;
	}

	.main .chat .bottom {
		padding: 10px 0;
	}

	.arrow{
		font-weight: bold;
		line-height: 60px;
	}

	.avatar-profile{
		border-radius: 50%;
		width: 200px;
		height:200px;
		margin-bottom:20px;
		border: 10px solid white;
	}

	.main .chat.chat-bottom .content>div{
		margin-top: 0;
	}

	.main .chat .bottom input{
		display: inherit;
	}

	.main .chat .btn{
		padding: 15px;
    	line-height: inherit;
	}

	.main .chat .bottom .form-control{
		padding: 16px;
	}

	.button {
		padding: 14px 25px;
	}
</style>
