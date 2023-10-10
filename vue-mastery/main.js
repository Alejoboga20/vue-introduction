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

        <product-tabs :reviews="reviews"></product-tabs>

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
			reviews: [],
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

Vue.component('product-review', {
	template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{error}}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name"/>
      </p>
      <p>
        <label for="review">Review:</label>
        <input id="review" v-model="review"/>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  `,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			errors: [],
		};
	},
	methods: {
		onSubmit() {
			if (this.name && this.review && this.rating) {
				const productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
				};
				this.$emit('review-submitted', productReview);
				this.name = null;
				this.review = null;
				this.rating = null;
			} else {
				if (!this.name) this.errors.push('Name required.');
				if (!this.review) this.errors.push('Review required.');
				if (!this.rating) this.errors.push('Rating required.');
			}
		},
	},
});

Vue.component('product-tabs', {
	props: {
		reviews: {
			type: Array,
			required: true,
		},
	},
	template: `
    <div>
      <div>
          <span 
          class="tab" 
          :class="{activeTab: selectedTab === tab}" 
          v-for="(tab, index) in tabs" 
          :key="index" 
          @click="selectedTab = tab">
            {{tab}}
          </span> 
        </div>

        <div class="reviews" v-show="selectedTab === 'Reviews'">
        <h2><b>Reviews</b></h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>

        <ul>
          <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
          </li>
        </ul>
      </div>

      <product-review v-show="selectedTab === 'Make a Review'" @review-submitted="addReview"></product-review>
    </div>
  `,
	data() {
		return {
			tabs: ['Reviews', 'Make a Review'],
			selectedTab: 'Reviews',
		};
	},
	methods: {
		addReview(productReview) {
			this.reviews.push(productReview);
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
