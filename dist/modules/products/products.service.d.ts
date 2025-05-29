import { ProductsRepository } from "./products.repository";
import { CreateProductsDto } from "./dtos/CreateProducts.dto";
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: ProductsRepository);
    getProducts(page: number, limit: number): Promise<{
        items: {
            id: string;
            name: string;
            description: string;
            price: string;
            stock: string;
            imgUrl: string | null;
            categories: {
                id: string;
                name: string;
            } | null;
        }[];
        meta: {
            currentPage: number;
            itemsPerPage: number;
            totalItems: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
    }>;
    getProductsById(id: string): Promise<any>;
    createProduct(product: CreateProductsDto): Promise<import("../../entities/products.entity").Products>;
    updateProduct(id: string, product: CreateProductsDto): Promise<string>;
    deleteProduct(id: string): Promise<string>;
    loadProduct(): Promise<void>;
}
