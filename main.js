/* Create a new Vew instance: The root of the application */
const app = new Vue({
	el: '#app',
	data: {
		product: 'Socks',
		image: './vue-socks.jpeg',
		altText: 'A pair of socks',
		onSale: true,
		inventory: 100,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{ variantId: 1, variantColor: 'green', variantImage: './vue-socks.jpeg' },
			{ variantId: 2, variantColor: 'blue', variantImage: './vue-blue-socks.jpeg' },
		],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
	},
});
