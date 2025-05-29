import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from '../../entities/products.entity';
import { Repository } from "typeorm";
import { loadData } from '../../helpers/preLoaderData';
import { Categories } from '../../entities/categories.entity';
import { isUUID } from "class-validator";
import { CreateProductsDto } from "./dtos/CreateProducts.dto";
import { Files } from '../../entities/files.entity';
@Injectable ()
export class ProductsRepository {

    constructor(
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>,
        @InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>,
        @InjectRepository(Files) private readonly filesRepository: Repository<Files>
    ) {}

    async getProducts(page: number, limit: number) {
        // Validar que page y limit sean positivos
        page = page > 0 ? page : 1;
        limit = limit > 0 ? limit : 5;
    
        // Obtener los productos con relaciones
        const [products, totalItems] = await this.productsRepository.findAndCount({
            relations: ['categories', 'files'],
            skip: (page - 1) * limit,
            take: limit,
        });
    
        // Transformar los productos para mostrar solo imgUrl y categoría simplificada
        const transformedProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imgUrl: product.files.length > 0 ? product.files[0].imgUrl : null,
            categories: product.categories ? {
                id: product.categories.id,
                name: product.categories.name
            } : null
        }));
    
        const totalPages = Math.ceil(totalItems / limit);
    
        return {
            items: transformedProducts,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        };
    }

    async getProductsById(id: string): Promise<string | any> {
        if (!isUUID(id)) {
            throw new BadRequestException('El ID debe ser válido');
        }
    
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['categories', 'files'],
        });
    
        if (!product) return 'Product not found';
    
        // Extraer solo el primer archivo como imgUrl
        const imgUrl = product.files.length > 0 ? product.files[0].imgUrl : null;
    
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imgUrl: imgUrl,
            categories: {
                id: product.categories?.id,
                name: product.categories?.name,
            }
        };
    }
    

    async createProduct(product: CreateProductsDto): Promise<Products> {
        const existe = await this.productsRepository.findOne({
            where: { name: product.name }
        });
        if (existe) {
            throw new BadRequestException('El producto ya existe');
        }
    
        const newProduct = new Products();
        
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        (product.imgUrl) ? newProduct.imgUrl = product.imgUrl : newProduct.imgUrl = "";
        
        // Relaciona categoría por id (creando instancia de Categories)
        const category = new Categories();
        category.id = product.categoriesId; 
        newProduct.categories = category; 
    
        // Guarda el producto en base de datos
        await this.productsRepository.save(newProduct);
    
        return newProduct;
    }

    async updateProductsById(id: string, product: CreateProductsDto): Promise<string> {
        const updateProduct = await this.productsRepository.findOne({
            where: { id },
            relations: ['categories'],
        });
    
        if (!updateProduct) {
            throw new NotFoundException('Producto no encontrado');
        }
    
        if (product.name !== undefined) updateProduct.name = product.name;
        if (product.description !== undefined) updateProduct.description = product.description;
        if (product.price !== undefined) updateProduct.price = product.price;
        if (product.stock !== undefined) updateProduct.stock = product.stock;
    
        // ✅ Actualizar mainImage si se envía
        if (product.imgUrl !== undefined) {
            const image = await this.filesRepository.findOne({ where: { imgUrl: product.imgUrl } });
            if (!image) {
                throw new BadRequestException('La Url de la imagen proporcionada no existe');
            }
            updateProduct.imgUrl = image.imgUrl;
        }
    
        // ✅ Actualizar categoría si se envía
        if (product.categoriesId !== undefined) {
            const category = await this.categoriesRepository.findOne({ where: { id: product.categoriesId } });
            if (!category) {
                throw new BadRequestException('La categoría proporcionada no existe');
            }
            updateProduct.categories = category;
        }
    
        await this.productsRepository.save(updateProduct);
        return 'Producto actualizado correctamente';
    }

    async deleteProduct(id: string): Promise<string> {
        
        const existeProduct = await this.productsRepository.findOne({
            where: { id },
          });
        if (existeProduct) {
            this.productsRepository.delete(id);
            return 'Product deleted successfully'; 
        }
        return 'Product not found';
    }

    async loadProduct() {
        let categoryId: any;
        for (const dato of loadData) {
            const product = new Products();
            product.name = dato.name;
            product.description = dato.description;
            product.price = dato.price.toString();
            product.stock = dato.stock.toString();
            if (dato.category !== undefined) {
                categoryId = await this.categoriesRepository.findOne({ 
                    where: { name: convertirCapital(dato.category)},
                    select: ['id']
                })
                product.categories = categoryId;
                await this.productsRepository.save(product);
            }
        }
    }

}

const convertirCapital = (str: any) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}