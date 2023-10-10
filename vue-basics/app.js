const app = Vue.createApp({
	methods: {},
	watch: {},
	computed: {},
	data() {
		return {
			message: 'Hello World!',
			quote: "I'm a quote from the data object",
			author: "I'm the author of the quote",
		};
	},
});

app.mount('#app');
