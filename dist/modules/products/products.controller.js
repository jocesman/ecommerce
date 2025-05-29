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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const CreateProducts_dto_1 = require("./dtos/CreateProducts.dto");
const authToken_guard_1 = require("../../guards/authToken.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorators_1 = require("../../decorators/roles.decorators");
const roles_enum_1 = require("../../roles.enum");
const swagger_1 = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    getProducts(page = 1, limit = 5) {
        page = page ? parseInt(page.toString()) : 1;
        limit = limit ? parseInt(limit.toString()) : 5;
        return this.productsService.getProducts(page, limit);
    }
    loadProduct() {
        return this.productsService.loadProduct();
    }
    getProductsById(id) {
        return this.productsService.getProductsById(id);
    }
    createProduct(product) {
        return this.productsService.createProduct(product);
    }
    deleteProduct(id) {
        return this.productsService.deleteProduct(id);
    }
    updateProduct(id, product) {
        return this.productsService.updateProduct(id, product);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene el listado de productos',
        description: 'Obtiene un listado completo de los productos disponibles en el sistema. Cualquier usuario puede consultar este endpoint. No requiere autenticación.'
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Get)('seeder'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Hace una pre-carga de productos en la base de datos',
        description: 'Carga los datos de productos en la base de datos. Solo accesible por administradores.'
    }),
    openapi.ApiResponse({ status: 201 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "loadProduct", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene un producto por su ID',
        description: 'Obtiene un producto por su ID. Cualquier usuario puede consultar este endpoint. No requiere autenticación.'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductsById", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    (0, roles_decorators_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crea un nuevo producto',
        description: 'Crea un nuevo producto en el sistema. Solo accesible por administradores.'
    }),
    openapi.ApiResponse({ status: 201, type: require("../../entities/products.entity").Products }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProducts_dto_1.CreateProductsDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, roles_decorators_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Elimina un producto por su ID',
        description: 'Elimina un producto por su ID. Solo accesible por administradores.'
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id'),
    (0, roles_decorators_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza un producto por su ID',
        description: 'Actualiza un producto por su ID. Solo accesible por administradores.'
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateProducts_dto_1.CreateProductsDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map