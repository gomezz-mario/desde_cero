export default class ProductDTO{
	constructor(product){
		this.title = product.title || "";
		this.description = product.description || "";
 		this.code = product.code;
  		this.price = product.price || 0;
  		this.status = product.status || false;
  		this.stock = product.stock || 0;
  		this.thumbnails = product.thumbnails || [];
		this.owner = product.owner || "admin";
	}
}