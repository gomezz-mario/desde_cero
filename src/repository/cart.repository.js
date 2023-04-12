class CartRepository{
	constructor(cartDao){
		this.cartDao = cartDao;
	};
	createCart = async() => {
		return await this.cartDao.createCart();
	};
	getCart = async(cartId) => {
		return await this.cartDao.getCart(cartId);
	};
	addProductsToCart = async(cartId, products) => {
		return await this.cartDao.addProductsToCart(cartId, products);
	};
	updateProductsToCart = async(cartId, products) => {
		return await this.cartDao.updateProductsToCart(cartId, products);
	};
	deleteProductsToCart = async(cartId, productsId) => {
		return await this.cartDao.deleteProductsToCart(cartId, productsId);
	};
	deleteAllProductsToCart = async(cartId) => {
		return await this.cartDao.deleteAllProductsToCart(cartId);
	};
	deleteCart = async(cartId) => {
		return await this.cartDao.deleteCart(cartId);
	};
}

export default CartRepository;