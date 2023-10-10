/* Create component */
Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true,
		},
	},
	template: `
    <div class="product">
      <!-- Use expressions to display data -->
      <div class="product-image">
        <!-- v-bind can be used with : -->
        <img v-bind:src="image" :alt="altText" />
      </div>
      <div class="product-info">
        <!-- Computed property -->
        <h1>{{title}}</h1>
        <span v-show="onSale">On Sale</span>
        <!-- We can use v-show if we don't want to remove the element from the DOM -->
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{shipping}}</p>

        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>

        <div
          v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{backgroundColor: variant.variantColor}"
          @mouseover="updateProduct(index)"
        >
          <!-- @ equals to v-on -->
        </div>
        <ul>
          <li v-for="size in sizes">{{size}}</li>
        </ul>

        <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">
          Add to cart
        </button>
      </div>
		</div>
  `,
	data: function () {
		return {
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
		};
	},
	/* Handlers */
	methods: {
		addToCart: function () {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
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
		shipping() {
			if (this.premium) {
				return 'Free';
			} else {
				return 2.99;
			}
		},
	},
});

/* Create a new Vew instance: The root of the application */
const app = new Vue({
	el: '#app',
	data: {
		premium: false,
		cart: [],
	},
	methods: {
		updateCart(id) {
			this.cart.push(id);
		},
	},
});
