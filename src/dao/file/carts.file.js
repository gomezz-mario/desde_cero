import FileManager from "./file_maganger.js";

class Cart{
	constructor(){
		this.fileManager = new FileManager('./db/carts.json');
	};
	createCart = async() => {
		return await this.fileManager.add({products: []});
	};
	getCart = async(cartId) => {
		return await this.fileManager.getById(cartId);
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
		return await this.fileManager.update(cartId, {products: productsInCart});
	};
	updateProductsToCart = async(cartId, products) => {
		const cart = await this.getCart(cartId);
		const productsInCart = cart.products;
		products.map(product => {
			let productInCart = productsInCart.find(prod => prod._id === product._id);
			if(productInCart){
				productInCart.quantity = product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await this.fileManager.update(cartId, {products: productsInCart});
	};
	deleteProductsToCart = async(cartId, productsId) => {
		const cart = await this.getCart(cartId);
		let productsInCart = cart.products;
		productsId.map(productId => {
			productsInCart = productsInCart.filter(productInCart => productInCart._id !== productId);
		});
		return await this.fileManager.update(cartId, {products: productsInCart});
	};
	deleteAllProductsToCart = async(cartId) => {
		return await this.fileManager.update(cartId, {products: []});
	};
	deleteCart = async(cartId) => {
		return await this.fileManager.delete(cartId);
	};
}

export default Cart;