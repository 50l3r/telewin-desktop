<template>
	<main>
		<div id="topbar"></div>
		<div class="layout">
			<div class="main order-md-2">
				<div class="start">
					<div class="container">
						<div class="col-md-12">
							<div class="content">
								<img class="img-fluid roto2" src="@/assets/img/resources/rotopizzo.png">

								<div v-if="mode=='signin'">
									<h1 class="text-white">Iniciar sesión</h1>
									<p>Introduce tu nick y token para continuar</p>

									<form class="signup" @submit.prevent="login" v-if="mode='signin'">
										<div class="form-group">
											<input type="nick" class="form-control" placeholder="Nick" v-model="usuario" tabindex=1 autofocus required>
											<button class="btn icon"><i class="material-icons">account_circle</i></button>
										</div>
										<div class="form-group">
											<input type="password" class="form-control" placeholder="Clave" v-model="token" tabindex=2 required>
											<button class="btn icon"><i class="material-icons">lock</i></button>
										</div>
										<button type="submit" class="btn button">Acceder</button>

										<div v-if="error" class="mt-4 text-danger">
											<strong>Ups!</strong> {{error}}
										</div>
									</form>
								</div>

								<div v-if="mode=='signup'">
									<h1 class="text-white">Crear nuevo minero</h1>
									<p>Introduce un nick y token para acceder</p>

									<form class="signup" @submit.prevent="register">
										<div class="form-group">
											<input type="nick" class="form-control" placeholder="Nick" v-model="usuario" tabindex=1 required>
											<button class="btn icon"><i class="material-icons">account_circle</i></button>
										</div>

										<div class="form-group">
											<input type="password" class="form-control" placeholder="Clave" v-model="token" tabindex=2 required>
											<button class="btn icon"><i class="material-icons">lock</i></button>
										</div>

										<div class="form-group">
											<input type="password" class="form-control" placeholder="Repite la clave" v-model="token2" tabindex=3 required>
											<button class="btn icon"><i class="material-icons">lock</i></button>
										</div>

										<button type="submit" class="btn button">Acceder</button>

										<div v-if="error" class="mt-4 text-danger">
											<strong>Ups!</strong> {{error}}
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="aside order-md-1">
				<div class="container">
					<div class="col-md-12">
						<div class="preference" v-if="mode=='signin'">
							<h2>Bienvenido Minero!</h2>
							<p>¿Es tu primera vez aqui? Registrate EasyFast.</p>
							<a @click="change_mode" class="btn button">REGISTRARSE</a>
						</div>
						<div class="preference" v-if="mode=='signup'">
							<h2>¿Nos conocemos?</h2>
							<p>¿Ya tienes cuenta? Accede desde aquí.</p>
							<a @click="change_mode" class="btn button">ACCEDER</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>

export default {
	name: 'Login',
	data: () => ({
		usuario: '',
		token: '',
		token2: '',
		mode: 'signin',
		error: '',
	}),
	methods: {
		async login() {
			const self = this;
			const re = /^[a-zA-Z0-9_]+$/;
			if (re.test(this.usuario)) {
				try {
					const Data = {
						nick: self.usuario,
						token: self.token,
					};

					const response = await this.$http.post(`${this.$root.paths.telemetry}/login.php`, new URLSearchParams(Data));

					this.$store.commit('login', response.data.message);
					this.$router.push('/');

					return true;
				} catch (error) {
					if (error.response.status === 403) {
						self.error = 'El usuario o clave son incorrectos';
					} else if (error.response.status === 400) {
						self.error = 'Algun campo esta mal introducido';
					} else {
						self.error = 'Ocurrio un error desconocido';
					}
				}
			} else {
				self.error = 'El usuario solo puede contener letras, numeros y _';
			}

			return false;
		},
		async register() {
			const self = this;
			const re = /^[a-zA-Z0-9_]+$/;
			if (re.test(this.usuario) && this.token === this.token2) {
				try {
					const Data = {
						nick: self.usuario,
						token: self.token,
					};

					const response = await this.$http.post(`${this.$root.paths.telemetry}/register.php`, new URLSearchParams(Data));

					this.$store.commit('login', {
						Nick: this.usuario, ID: response.data.message.ID, Secret: response.data.message.Secret, Retries: 0, Pizzas: 0, Email: null,
					});
					this.$router.push('/');

					return true;
				} catch (error) {
					if (error.status === 403) {
						self.error = 'El usuario o clave son incorrectos';
					} else if (error.status === 400) {
						self.error = 'Algun campo esta mal introducido';
					} else {
						self.error = 'Ocurrio un error desconocido';
					}
				}
			} else {
				self.error = 'Algunos de los campos no esta bien introducido';
			}

			return false;
		},
		change_mode() {
			if (this.mode === 'signin') {
				this.mode = 'signup';
			} else {
				this.mode = 'signin';
			}
		},
	},
};
</script>

<style>

</style>
