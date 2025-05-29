import { ProductsService } from "./products.service";
import { CreateProductsDto } from "./dtos/CreateProducts.dto";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page?: number, limit?: number): Promise<{
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
    loadProduct(): Promise<void>;
    getProductsById(id: string): Promise<any>;
    createProduct(product: CreateProductsDto): Promise<import("../../entities/products.entity").Products>;
    deleteProduct(id: string): Promise<string>;
    updateProduct(id: string, product: CreateProductsDto): Promise<string>;
}
