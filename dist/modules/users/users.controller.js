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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const CreateUsers_dto_1 = require("./dtos/CreateUsers.dto");
const UpdateUsers_dto_1 = require("./dtos/UpdateUsers.dto");
const authToken_guard_1 = require("../../guards/authToken.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const roles_decorators_1 = require("../../decorators/roles.decorators");
const roles_enum_1 = require("../../roles.enum");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getAdminUsers() {
        return 'Yo estoy en el admin, actúo como admin, trabajo en el admin pero no soy el admin';
    }
    getUsers() {
        return this.usersService.getUsers();
    }
    getUsersById(id) {
        return this.usersService.getUsersById(id);
    }
    createUser(user) {
        return this.usersService.createUser(user);
    }
    updateUser(id, user) {
        return this.usersService.updateUser(id, user);
    }
    deleteUser(id) {
        return this.usersService.deleteUser(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('admin'),
    (0, roles_decorators_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiExcludeEndpoint)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAdminUsers", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    (0, roles_decorators_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene el listado de usuarios',
        description: 'Obtiene un listado completo de los usuarios disponibles en el sistema. Solo accesible por administradores. Requiere autenticación.'
    }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene un usuario por su ID',
        description: 'Obtiene un usuario por su ID. Solo accesible por administradores. Requiere autenticación.'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsersById", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crea un nuevo usuario',
        description: 'Crea un nuevo usuario en el sistema. El usuario creado se almacena en la base de datos y puede ser autenticado posteriormente usando el endpoint de inicio de sesión. Los administradores pueden crear usuarios.'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUsers_dto_1.CreateUsersDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza un usuario por su ID',
        description: 'Actualiza un usuario por su ID. Solo accesible por administradores. Requiere autenticación.'
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUsers_dto_1.UpdateUsersDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Elimina un usuario por su ID',
        description: 'Elimina un usuario por su ID. Solo accesible por administradores. Requiere autenticación.'
    }),
    openapi.ApiResponse({ status: 200, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map