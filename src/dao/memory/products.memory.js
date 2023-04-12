import MemoryManager from "./memory_manager.js";

class Product{
	constructor(){
		this.memoryManager = new MemoryManager();
	}

    addProduct = async(data) => {
        return await this.memoryManager.add(data);
    }

    getById = async(id) => {
        return await this.memoryManager.getById(id);
    }

    updateProductById = async(id, data) => {
        return await this.memoryManager.update(id, data);
    }

    deleteProductById = async(id) => {
        return await this.memoryManager.delete(id);
    }

    getProducts = async(page, limit, filters, sortMethod) => {
        let results = [];
        results = await this.memoryManager.getByParams(filters);
        if(sortMethod){
            if(sortMethod === "amascostoso"){
                results = results.sort((a,b) => a.price - b.price);
            }
            if(sortMethod === "amaseconomico"){
                results = results.sort((a,b) => b.price - a.price);
            }
        }
        const totalDocs = results.length;
        let totalPages = 0;
        if(totalDocs <= limit){
            totalPages = 1;
        } else{
            totalPages = Math.floor(totalDocs/limit) + 1;
        }
        let rPage = parseInt(page);
        if(totalDocs < limit){
            rPage = 1;
        } else{
            if(rPage > totalPages){
                rPage = totalPages;
            }
        }
        const doc = {
            products: results,
            pagination: {
                limit,
                totalPages,
                totalDocs, 
                prevPage: rPage > 1 ? rPage - 1 : null, 
                nextPage: rPage < totalPages ? rPage + 1 : null, 
                page: rPage,
                hasPrevPage: rPage > 1, 
                hasNextPage: rPage < totalPages, 
            }  
        };
        doc.pagination.prevLink = doc.pagination.hasPrevPage ? `/api/products/?page=${doc.pagination.prevPage}&limit=${doc.pagination.limit}${filters.length>0?`&filters=${Object.values(filters).join("-")}${sortMethod?`&sort=${sortMethod}`:``}`:``}`:null;
        doc.pagination.nextLink = doc.pagination.hasNextPage ? `/api/products/?page=${doc.pagination.nextPage}&limit=${doc.pagination.limit}${filters.length>0?`&filters=${Object.values(filters).join("-")}${sortMethod?`&sort=${sortMethod}`:``}`:``}`:null;
        return doc;
    }
}

export default Product;