"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const products_repository_1 = require("./products.repository");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../../entities/products.entity");
const categories_entity_1 = require("../../entities/categories.entity");
const files_entity_1 = require("../../entities/files.entity");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([products_entity_1.Products, categories_entity_1.Categories, files_entity_1.Files])],
        providers: [products_service_1.ProductsService, products_repository_1.ProductsRepository],
        controllers: [products_controller_1.ProductsController],
    })
], ProductModule);
//# sourceMappingURL=products.module.js.map