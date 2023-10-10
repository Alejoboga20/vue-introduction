/* Create a new Vew instance: The root of the application */
const app = new Vue({
	el: '#app',
	/* Data representation */
	data: {
		brand: 'Vue Mastery',
		product: 'Socks',
		selectedVariant: 0,
		altText: 'A pair of socks',
		onSale: true,
		inventory: 100,
		details: ['80% cotton', '20% polyester', 'Gender-neutral'],
		variants: [
			{
				variantId: 1,
				variantColor: 'green',
				variantImage: './vue-green-socks.jpeg',
				variantQuantity: 100,
			},
			{
				variantId: 2,
				variantColor: 'blue',
				variantImage: './vue-blue-socks.jpeg',
				variantQuantity: 0,
			},
		],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
		cart: 0,
	},
	/* Handlers */
	methods: {
		addToCart: function () {
			this.cart += 1;
		},
		updateProduct: function (index) {
			this.selectedVariant = index;
		},
	},
	/* Computed properties act like calculator */
	computed: {
		title() {
			/* Title will change when dependencies here change */
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
	},
});
