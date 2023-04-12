import MemoryManager from "./memory_manager.js";

class Cart{
	constructor(){
		this.memoryManager = new MemoryManager();
	};
	createCart = async() => {
		return await this.memoryManager.add({products: []});
	};
	getCart = async(cartId) => {
		return await this.memoryManager.getById(cartId);
	};
	addProductsToCart = async(cartId, products) => {
		const cart = await this.getCart(cartId);
		const productsInCart = cart.products;
		products.map(product => {
			let productInCart = productsInCart.find(prod => prod._id === product._id);
			if(productInCart){
				productInCart.quantity += product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await this.memoryManager.update(cartId, {products: productsInCart});
	};
	updateProductsToCart = async(cartId, products) => {
		const cart = await this.getCart(cartId);
		const productsInCart = cart.products;
		products.map(product => {
			let productInCart = productsInCart.find(prod => prod._id === product._id);
			if(productInCart){
				productInCart.quantity = product.quantity;
			} else{
				productInCart.push(product);
			}
		});
		return await this.memoryManager.update(cartId, {products: productsInCart});
	};
	deleteProductsToCart = async(cartId, productsId) => {
		const cart = await this.getCart(cartId);
		let productsInCart = cart.products;
		productsId.map(productId => {
			productsInCart = productsInCart.filter(productInCart => productInCart._id !== productId);
		});
		return await this.memoryManager.update(cartId, {products: productsInCart});
	};
	deleteAllProductsToCart = async(cartId) => {
		return await this.memoryManager.update(cartId, {products: []});
	};
	deleteCart = async(cartId) => {
		return await this.memoryManager.delete(cartId);
	};
}

export default Cart;