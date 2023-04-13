import { cartService } from "../repository/index.js";

export const createCart = async(req, res) => {
	const result = await cartService.createCart();
	req.logger.debug("Carrito creado.");
	res.json({status: "success", result});
};
export const getCart = async(req, res) => {
	const cartId = req.params.cid;
	const createCart = await cartService.getCart(cartId);
	req.logger.debug("Carrito encontrado.");
	res.status(200).json({status: "success", cart: createCart});
};
export const addProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const products = req.body.products;
	const result = await cartService.addProductsToCart(cartId, Object.values(products));
	req.logger.debug("Se agregaron nuevos productos al carrito.");
	res.json({status: "success", result});
};
export const updateProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const products = req.body.products;
	const result = await cartService.updateProductsToCart(cartId, products);
	req.logger.debug("Se actualizaron los productos en el carrito.");
	res.json({status: "success", result});
};
export const deleteProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const productsId = req.body.productsId;
	const result = cartService.deleteProductsToCart(cartId, productsId);
	req.logger.debug(`Se eliminaron ${productsId.length} productos del carrito.`);
	res.json({status: "success", result});
};
export const deleteAllProductsToCart = async(req, res) => {
	const cartId = req.params.cid;
	const result = cartService.deleteAllProductsToCart(cartId);
	req.logger.debug("Se vació el carrito.")
	res.json({status: "success", result});
};
export const deleteCart = async(req, res) => {
	const cartId = req.params.cid;
	const result = cartService.deleteCart(cartId);
	req.logger.debug("Carrito eliminado.")
	res.json({status: "success", result});
};