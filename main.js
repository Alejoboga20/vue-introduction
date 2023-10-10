/* Create a new Vew instance: The root of the application */
const app = new Vue({
	el: '#app',
	/* Data representation */
	data: {
		product: 'Socks',
		image: './vue-green-socks.jpeg',
		altText: 'A pair of socks',
		onSale: true,
		inventory: 100,
		inStock: true,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{ variantId: 1, variantColor: 'green', variantImage: './vue-green-socks.jpeg' },
			{ variantId: 2, variantColor: 'blue', variantImage: './vue-blue-socks.jpeg' },
		],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
		cart: 0,
	},
	/* Handlers */
	methods: {
		addToCart: function () {
			this.cart += 1;
		},
		updateProduct: function (variantImage) {
			this.image = variantImage;
		},
	},
});
