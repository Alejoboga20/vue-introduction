const app = Vue.createApp({
	watch: {},
	computed: {},
	data() {
		return {
			message: 'Hello World!',
			quote: "I'm a quote from the data object",
			author: "I'm the author of the quote",
		};
	},
	methods: {
		changeQuote() {
			this.quote = "I'm a new quote from the method";
			this.author = "I'm the author of the new quote";

			this.capitalizeFirstLetter();
		},
		capitalizeFirstLetter() {
			this.quote = this.quote.toUpperCase();
		},
	},
});

app.mount('#app');
