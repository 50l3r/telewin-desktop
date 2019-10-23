export default {
	created() {
		this.verifyName();
	},
	methods: {
		randomMail() {
			let email = '';
			let name = this.verifyName();

			if (name) {
				name = name.toLowerCase().replace('@gmail.com', '');

				const adj = ['crack', 'fiera', 'mostro', 'animal', 'maquina', 'gigante', 'artista', 'titan', 'caiman', 'tiranosaurio', 'superman', 'prenda', 'semental', 'ninja', 'figura', 'genio', 'tsunami', 'leon', 'terminator', 'goliat', 'terremoto', 'tigre', 'vaquero', 'tanque', 'mole', 'samurai', 'coloso', 'paladin', 'willyrex', 'lobezno', 'velociraptor', 'espectro', 'vikingo', 'godzilla', 'cazadecombate', 'campeon', 'adamantium', 'robocop', 'zeus', 'capitan', 'kingkong', 'depredador', 'tornado', 'monstertruck', 'presa', 'canario', 'johnny', 'bravo', 'mastodonte', 'coronel', 'heroe', 'canallita', 'champion', 'jefe', 'chulazo', 'truhan', 'maquinola'];

				const job = ['ninja', 'jefe', 'cocinero', 'mago', 'caballo', 'arcoiris', 'laser', 'junior', 'conejo', 'capitan', 'nibblets', 'tortita', 'zanahoria', 'gnomo', 'glitter', 'patata', 'ensalada', 'tomillo', 'cortinas', 'abeja', 'baño', 'exorcista', 'figurita', 'huevos', 'oceano', 'dragones', 'chuches', 'pipas', 'muñeca', 'arbusto', 'galleta', 'manzanas', 'helado', 'guitarra', 'pistola', 'flauta', 'cantante', 'circo', 'trampoline', 'telon', 'carnaval', 'locomotora', 'globo', 'mantis', 'animador', 'artesano', 'artista', 'pintor', 'tatuador', 'tendero', 'director', 'diseñador', 'fotografo', 'estilista', 'lider', 'lira', 'maquina', 'modelo', 'musico', 'lapiz', 'productor', 'cineasta', 'decorado', 'pizarra', 'profe', 'mecanico', 'barbero', 'boli', 'gorro', 'azafata', 'bombero', 'mantenimiento', 'maestro', 'educador', 'panel', 'patente', 'operador', 'plumero', 'relleno', 'tienda', 'jabon', 'estacion', 'sillon', 'carpintero'];

				const radji = Math.floor(Math.random() * adj.length);
				const rjob = Math.floor(Math.random() * job.length);
				const randomYear = parseInt(Math.random() * (2015 - 1960) + 1960, 10);

				email = `${name}+${job[rjob]}${adj[radji]}${randomYear}@gmail.com`;

				return email;
			}

			return false;
		},
		verifyName() {
			const { name } = this.$store.getters.config;

			if (name) {
				return name;
			}

			if (this.$store.getters.isOnline) {
				this.$root.toast('Aún no has configurado tu nombre de cuenta de gmail', 'warning');
			}

			return false;
		},
	},

};
