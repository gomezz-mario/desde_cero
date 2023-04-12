import ProductModel from "./models/product.model.js";
import ConnectMongo from "./connect.mongo.js";

class Product{
	constructor(){
		ConnectMongo.getInstance();
	}

    addProduct = async(data) => {
        return await ProductModel.create(data);
    }

    getProductById = async(id) => {
        return await ProductModel.findById(id);
    }

    updateProductById = async(id, data) => {
        return await ProductModel.findByIdAndUpdate(id, data);
    }

    deleteProductById = async(id) => {
        return await ProductModel.findByIdAndDelete(id);
    }

    getProducts = async(page, limit, filters, sortMethod) => {
        let results = [];

        const filt = filters.length > 0 ? filters.reduce((acum, elem) => {
            let a = Object.entries(elem)[0];
            acum[a[0]] = a[1];
            return acum;
        }, {}) :{};

        if(sortMethod && (sortMethod === "amascostoso" || sortMethod === "amaseconomico")){
            if(sortMethod === "amascostoso"){
                results = await ProductModel.paginate(filt,{page, limit, lean: true, sort: { price: 'asc' }});
            } else{
                results = await ProductModel.paginate(filt,{page, limit, lean: true, sort: { price: 'desc'}});
            }
        } else{
            results = await ProductModel.paginate(filt,{page, limit, lean: true});
        }

        const doc = {
			products: results.docs,
			pagination: {
                limit,
				totalPages: results.totalPages, 
				totalDocs: results.totalDocs,
                page: results.page, 
				prevPage: results.prevPage, 
				nextPage: results.nextPage, 
				hasPrevPage: results.hasPrevPage, 
				hasNextPage: results.hasNextPage, 
			}  
		};

        let sFilters = "&filters=";
        for(let i=0; i<filters.length; i++){
            if(i>0) sFilters += "-";
            let elemFilter = Object.entries(filters[i])[0];
            if(elemFilter[0] === "status" && elemFilter[1] === true ) sFilters += "disponible";
            if(elemFilter[0] === "status" && elemFilter[1] === false) sFilters += "nodisponible";
            if(elemFilter[0] === "category" && elemFilter[1] === "tablets") sFilters += "tablets";
        }
        doc.pagination.prevLink = doc.pagination.hasPrevPage ? `/api/products/?page=${doc.pagination.prevPage}limit=${doc.pagination.limit}${filters.length > 0 ? sFilters : ''}${sortMethod ? `&sort=${sortMethod}` : ''}`:null;
        doc.pagination.nextLink = doc.pagination.hasNextPage ? `/api/products/?page=${doc.pagination.nextPage}limit=${doc.pagination.limit}${filters.length > 0 ? sFilters : ''}${sortMethod ? `&sort=${sortMethod}` : ''}`:null;
        return doc;
    }
}

export default Product;