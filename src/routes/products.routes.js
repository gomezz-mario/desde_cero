import CustomRouter from "./custom.routes.js";
import { get, create, getById, updateById, deleteById } from "../controllers/products.controller.js";

class ProductRouter extends CustomRouter{
	init(){
		this.get('/', ["PUBLIC"], get);
		this.post('/', ["PREMIUM"], create);
		this.get('/:pid', ["PUBLIC"], getById);
		this.put('/:pid', ["PREMIUM"], updateById);
		this.delete('/:pid', ["PREMIUM"], deleteById);
	}
}

export default ProductRouter;