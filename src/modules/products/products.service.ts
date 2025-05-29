import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CreateProductsDto } from "./dtos/CreateProducts.dto";

@Injectable()
export class ProductsService {
            
    constructor(private productsRepository: ProductsRepository) {}

    getProducts(page: number, limit: number){
        return this.productsRepository.getProducts(page, limit);
    }

    getProductsById(id: string) {
        return this.productsRepository.getProductsById(id);
    }

    createProduct(product: CreateProductsDto) {
        return this.productsRepository.createProduct(product);
    }

    updateProduct(id: string, product: CreateProductsDto) {
        return this.productsRepository.updateProductsById(id, product);
    }

    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id);
    }

    loadProduct() {
        return this.productsRepository.loadProduct(); 
    }
    
}