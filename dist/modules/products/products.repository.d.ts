import { Products } from '../../entities/products.entity';
import { Repository } from "typeorm";
import { Categories } from '../../entities/categories.entity';
import { CreateProductsDto } from "./dtos/CreateProducts.dto";
import { Files } from '../../entities/files.entity';
export declare class ProductsRepository {
    private readonly productsRepository;
    private readonly categoriesRepository;
    private readonly filesRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>, filesRepository: Repository<Files>);
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
    getProductsById(id: string): Promise<string | any>;
    createProduct(product: CreateProductsDto): Promise<Products>;
    updateProductsById(id: string, product: CreateProductsDto): Promise<string>;
    deleteProduct(id: string): Promise<string>;
    loadProduct(): Promise<void>;
}
