import ProductDTO from "../dao/dto/product.dto.js";

export default class ProductRepository{
	constructor(productDao){
		this.productDao = productDao;
	}

    addProduct = async(data) => {
        const dataToInsert = new ProductDTO(data);
        return await this.productDao.addProduct(dataToInsert);
    }

    getProductById = async(id) => {
        return await this.productDao.getProductById(id);
    }

    updateProductById = async(id, data) => {
        return await this.productDao.updateProductById(id, data)
    }

    deleteProductById = async(id) => {
        return await this.productDao.deleteProductById(id);
    }

    getProducts = async(page, limit, filters, sortMethod) => {
        return await this.productDao.getProducts(page, limit, filters, sortMethod);
    }

}