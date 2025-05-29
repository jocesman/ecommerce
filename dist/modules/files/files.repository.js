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
exports.FilesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const files_entity_1 = require("../../entities/files.entity");
const products_entity_1 = require("../../entities/products.entity");
const typeorm_2 = require("typeorm");
const cloudinary_service_1 = require("./cloudinary.service");
const uuid_1 = require("uuid");
let FilesRepository = class FilesRepository {
    filesRepository;
    productsRepository;
    cloudinaryService;
    constructor(filesRepository, productsRepository, cloudinaryService) {
        this.filesRepository = filesRepository;
        this.productsRepository = productsRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async getFiles() {
        return await this.filesRepository.find({
            relations: ['products']
        });
    }
    async getFileById(id) {
        const file = await this.filesRepository.findOne({
            where: { id },
            relations: ['products']
        });
        if (file)
            return file;
        return new common_1.BadRequestException('El archivo de imagen no existe');
    }
    async uploadImage(id, file) {
        const product = await this.productsRepository.findOne({ where: { id }, relations: ['categories'] });
        if (!product) {
            throw new common_1.BadRequestException('El producto no existe');
        }
        const imagencargada = await this.cloudinaryService.uploadImage(file);
        console.log(imagencargada);
        if (!imagencargada) {
            throw new common_1.BadRequestException('Error al subir la imagen');
        }
        const newFile = new files_entity_1.Files();
        newFile.id = (0, uuid_1.v4)();
        newFile.filename = imagencargada.display_name;
        newFile.mimetype = `${imagencargada.resource_type}/${imagencargada.format}`;
        newFile.imgUrl = imagencargada.secure_url;
        newFile.products = [product];
        if (!product.files) {
            product.files = [];
        }
        product.files.push(newFile);
        product.imgUrl = newFile.id;
        await this.filesRepository.save(newFile);
        await this.productsRepository.save(product);
        return "Imagen subida correctamente. Producto actualizado.";
    }
};
exports.FilesRepository = FilesRepository;
exports.FilesRepository = FilesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(files_entity_1.Files)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        cloudinary_service_1.CloudinaryService])
], FilesRepository);
//# sourceMappingURL=files.repository.js.map