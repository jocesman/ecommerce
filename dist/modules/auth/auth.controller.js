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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const LoginUserDto_dto_1 = require("./dtos/LoginUserDto.dto");
const CreateUsers_dto_1 = require("../users/dtos/CreateUsers.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async createUser(user) {
        return this.authService.createUser(user);
    }
    authUser(credentials) {
        return this.authService.authUser(credentials);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registra un nuevo usuario en el sistema',
        description: `Este endpoint permite crear un nuevo usuario proporcionando la información necesaria.
        El usuario creado se almacena en la base de datos y puede ser autenticado posteriormente usando el endpoint de inicio de sesión.`,
    }),
    (0, swagger_1.ApiBody)({
        description: 'Datos necesarios para crear un nuevo usuario',
        type: CreateUsers_dto_1.CreateUsersDto
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUsers_dto_1.CreateUsersDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Inicia sesión y se obtiene un token de acceso',
        description: `Este endpoint valida las credenciales del usuario (correo electrónico y contraseña).
        Si son correctas, retorna un token JWT que deberá ser usado en los encabezados para acceder a rutas protegidas.`,
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginUserDto_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "authUser", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map