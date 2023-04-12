import { productService } from "../repository/index.js";

export const create = async (req, res) => {
	const data = req.body.productData;
	data.owner = req.session.user._id;
	const result = await productService.addProduct(data);
	if(!result) return res.sendServerError("Error al crear producto.");
	return res.sendSuccess(result);
};

export const getById = async (req, res) => {
	const id = req.params.pid;
	const result = await productService.getProductById(id);
	if(!result) return res.sendBadRequestError("Producto no encontrado.");
	return res.sendSuccess(result);
};

export const updateById = async (req, res) => {
	const id = req.params.pid;
	const product = await productService.getProductById(id);
	if(req.user.role !== "admin"){
		if(product.owner === "admin") return res.sendUnauthorizedError("Solo el admin puede modificar este producto.");
		if(product.owner !== req.user._id) return res.sendUnauthorizedError("No puedes modificar este producto.");
	}
	const data = req.body.productData;
	const result = await productService.updateProductById(id, data);
	res.sendSuccess(result);
};

export const deleteById = async (req, res) => {
	const id = req.params.pid;
	const product = await productService.getProductById(id);
	if(req.user.role !== "admin"){
		if(product.owner === "admin") return res.sendUnauthorizedError("Solo el admin puede eliminar este producto.");
		if(product.owner !== req.user._id) return res.sendUnauthorizedError("No puedes eliminar este producto.");
	}
	const result = await productService.deleteProductById(id);
	res.sendSuccess(result);
};

export const get = async(req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	let filters = [];
	if(req.query.filters){
		req.query.filters.split("-").forEach(filter => {
			if(filter === "disponible"){
				filters.push({status: true});
			}
			if(filter === "nodisponible"){
				filters.push({status: false});
			}
			if(filter === "tablets"){
				filters.push({category: "tablets"});
			}
		});
	}
	const sort = req.query.sort || null;
	const result = await productService.getProducts(page, limit, filters, sort);
	if(!result) return res.sendServerError("Error al consultar productos.");
	return res.sendSuccess(result);
}