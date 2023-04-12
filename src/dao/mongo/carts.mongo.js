import Connect from "./connect.mongo.js";
import CartModel from "./models/cart.model.js";

class Cart{
	constructor(){
		Connect.getInstance();
	};
	createCart = async() => {
		return await CartModel.create({products: []});
	};
	getCart = async(cartId) => {
		return await CartModel.findById(cartId);
	};
	addProductsToCart = async(cartId, products) => {
		const cart = await this.getCart(cartId);
		const productsInCart = cart.products;
		products.map(product => {	
			let productInCart = productsInCart.find(prod => prod._id.toString() === product._id);
			if(productInCart){
				productInCart.quantity += product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await CartModel.findByIdAndUpdate(cartId, {products: productsInCart});
	};
	updateProductsToCart = async(cartId, products) => {
		const cart = await this.getCart(cartId);
		const productsInCart = cart.products;
		products.map(product => {	
			let productInCart = productsInCart.find(prod => prod._id.toString() === product._id);
			if(productInCart){
				productInCart.quantity = product.quantity;
			} else{
				productsInCart.push(product);
			}
		});
		return await CartModel.findByIdAndUpdate(cartId, {products: productsInCart});
	};
	deleteProductsToCart = async(cartId, productsId) => {
		const cart = await this.getCart(cartId);
		let productsInCart = cart.products;
		productsId.map(productId => {
			productsInCart = productsInCart.filter(product => product._id !== productId);
		});
		return await CartModel.findByIdAndUpdate(cartId, {products: productsInCart});
	};
	deleteAllProductsToCart = async(cartId) => {
		return await CartModel.findByIdAndUpdate(cartId, {products: []});
	};
	deleteCart = async(cartId) => {
		return await CartModel.findByIdAndDelete(cartId);
	};
}

export default Cart;