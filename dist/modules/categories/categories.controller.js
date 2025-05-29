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
exports.CategoriesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const roles_guard_1 = require("../../guards/roles.guard");
const Category_dto_1 = require("./dtos/Category.dto");
const swagger_1 = require("@nestjs/swagger");
const authToken_guard_1 = require("../../guards/authToken.guard");
const roles_decorators_1 = require("../../decorators/roles.decorators");
const roles_enum_1 = require("../../roles.enum");
let CategoriesController = class CategoriesController {
    CategoriesService;
    constructor(CategoriesService) {
        this.CategoriesService = CategoriesService;
    }
    getCategories() {
        return this.CategoriesService.getCategories();
    }
    loadCategories() {
        return this.CategoriesService.loadCategories();
    }
    addCategory(category) {
        return this.CategoriesService.addCategory(category);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorators_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Muetra el listado de categorías',
        description: 'Obtiene un listado completo de las categorías disponibles en el sistema. Solo accesible por usuarios con rol de administrador.'
    }),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/categories.entity").Categories] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('seeder'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Hace una pre-carga de categorías en la base de datos ',
        description: 'Carga los datos de las categorías en el sistema. Solo accesible por usuarios con rol de administrador.'
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "loadCategories", null);
__decorate([
    (0, common_1.Post)('addCategory'),
    (0, roles_decorators_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Añade una nueva categoría',
        description: 'Añade una nueva categoría al sistema. Solo accesible por usuarios con rol de administrador.'
    }),
    openapi.ApiResponse({ status: 201, type: require("../../entities/categories.entity").Categories }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category_dto_1.CategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "addCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map