import CustomRouter from "./custom.routes.js";
import { createCart, getCart, addProductsToCart, updateProductsToCart, deleteProductsToCart, deleteAllProductsToCart, deleteCart } from "../controllers/carts.controller.js";

class CartsRouter extends CustomRouter{
	init(){
		this.post('/', ["USER"], createCart);
		this.get('/:cid', ["USER"], getCart);
		this.post('/:cid', ["USER"], addProductsToCart);
		this.put('/:cid', ["USER"], updateProductsToCart);
		this.put('/:cid/clear', ["USER"], deleteProductsToCart);
		this.put('/:cid/clear-all', ["USER"], deleteAllProductsToCart);
		this.delete('/:cid', ["USER"], deleteCart);
	}
}

export default CartsRouter;