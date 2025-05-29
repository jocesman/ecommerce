"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../../entities/products.entity");
const typeorm_2 = require("typeorm");
const preLoaderData_1 = require("../../helpers/preLoaderData");
const categories_entity_1 = require("../../entities/categories.entity");
const class_validator_1 = require("class-validator");
const files_entity_1 = require("../../entities/files.entity");
let ProductsRepository = class ProductsRepository {
    productsRepository;
    categoriesRepository;
    filesRepository;
    constructor(productsRepository, categoriesRepository, filesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.filesRepository = filesRepository;
    }
    async getProducts(page, limit) {
        page = page > 0 ? page : 1;
        limit = limit > 0 ? limit : 5;
        const [products, totalItems] = await this.productsRepository.findAndCount({
            relations: ['categories', 'files'],
            skip: (page - 1) * limit,
            take: limit,
        });
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
    async getProductsById(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('El ID debe ser válido');
        }
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: ['categories', 'files'],
        });
        if (!product)
            return 'Product not found';
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
    async createProduct(product) {
        const existe = await this.productsRepository.findOne({
            where: { name: product.name }
        });
        if (existe) {
            throw new common_1.BadRequestException('El producto ya existe');
        }
        const newProduct = new products_entity_1.Products();
        newProduct.name = product.name;
        newProduct.description = product.description;
        newProduct.price = product.price;
        newProduct.stock = product.stock;
        (product.imgUrl) ? newProduct.imgUrl = product.imgUrl : newProduct.imgUrl = "";
        const category = new categories_entity_1.Categories();
        category.id = product.categoriesId;
        newProduct.categories = category;
        await this.productsRepository.save(newProduct);
        return newProduct;
    }
    async updateProductsById(id, product) {
        const updateProduct = await this.productsRepository.findOne({
            where: { id },
            relations: ['categories'],
        });
        if (!updateProduct) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        if (product.name !== undefined)
            updateProduct.name = product.name;
        if (product.description !== undefined)
            updateProduct.description = product.description;
        if (product.price !== undefined)
            updateProduct.price = product.price;
        if (product.stock !== undefined)
            updateProduct.stock = product.stock;
        if (product.imgUrl !== undefined) {
            const image = await this.filesRepository.findOne({ where: { imgUrl: product.imgUrl } });
            if (!image) {
                throw new common_1.BadRequestException('La Url de la imagen proporcionada no existe');
            }
            updateProduct.imgUrl = image.imgUrl;
        }
        if (product.categoriesId !== undefined) {
            const category = await this.categoriesRepository.findOne({ where: { id: product.categoriesId } });
            if (!category) {
                throw new common_1.BadRequestException('La categoría proporcionada no existe');
            }
            updateProduct.categories = category;
        }
        await this.productsRepository.save(updateProduct);
        return 'Producto actualizado correctamente';
    }
    async deleteProduct(id) {
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
        let categoryId;
        for (const dato of preLoaderData_1.loadData) {
            const product = new products_entity_1.Products();
            product.name = dato.name;
            product.description = dato.description;
            product.price = dato.price.toString();
            product.stock = dato.stock.toString();
            if (dato.category !== undefined) {
                categoryId = await this.categoriesRepository.findOne({
                    where: { name: convertirCapital(dato.category) },
                    select: ['id']
                });
                product.categories = categoryId;
                await this.productsRepository.save(product);
            }
        }
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __param(2, (0, typeorm_1.InjectRepository)(files_entity_1.Files)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsRepository);
const convertirCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
//# sourceMappingURL=products.repository.js.map