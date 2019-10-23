import nodeNotifier from 'node-notifier';

export default {
	data() {
		return {
			notifier: nodeNotifier,
		};
	},
	methods: {
		toast(message, type = 'primary') {
			this.$toasted.show(message, {
				theme: `toasted-${type}`,
				position: 'top-right',
				fullWidth: true,
				Icon: 'alert-outline',
				iconPack: 'mdi',
				duration: 5000,
				fitToScreen: true,
			});

			this.$root.notifier.notify({
				message: 'Aún no has configurado tu nombre de cuenta de gmail',
				title: 'Uepa',
				sound: true,
				icon: `${this.$root.paths.static}/img/fav.png`,
				wait: true,
			});
		},
		parseError(type, error) {
			console.log(error);

			if (type === 'third') {
				if (error.response.status === 403) {
					this.$root.toast('Es posible que tu ip este bloqueada. Revisa tus privilegios');
				}
			} else if (type === 'home') {
				if (error.response.status === 403) {
					this.$store.commit('logout');
					this.$router.push({ name: 'login' });
				} else {
					this.$root.toast('Ocurrió un error en el contacto con la api de telemetria. Avisa a 50l3r');
				}
			}
		},
	},
};
