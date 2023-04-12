import { cartService } from "../repository/index.js";

export const createCart = async(req, res) => {
	const result = await cartService.createCart();
	res.json({status: "success", result});
};
export const getCart = async(req, res) => {
	const cartId = req.params.cid;
	const createCart = await cartService.getCart(cartId);
	res.status(200).json({status: "success", cart: createCart});
};
export const addProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const products = req.body.products;
	const result = await cartService.addProductsToCart(cartId, Object.values(products));
	res.json({status: "success", result});
};
export const updateProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const products = req.body.products;
	const result = await cartService.updateProductsToCart(cartId, products);
	res.json({status: "success", result});
};
export const deleteProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const productsId = req.body.productsId;
	const result = cartService.deleteProductsToCart(cartId, productsId);
	res.json({status: "success", result});
};
export const deleteAllProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const result = cartService.deleteAllProductsToCart(cartId);
	res.json({status: "success", result});
};
export const deleteCart = async(req, res) => {
	const cartId = req.params.cid;
	const result = cartService.deleteCart(cartId);
	res.json({status: "success", result});
};