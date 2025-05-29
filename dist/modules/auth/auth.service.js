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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_2 = require("typeorm");
const users_repository_1 = require("../users/users.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    authRepository;
    usersRepository;
    jwtService;
    constructor(authRepository, usersRepository, jwtService) {
        this.authRepository = authRepository;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async createUser(user) {
        return await this.usersRepository.createUser(user);
    }
    async authUser(credentials) {
        const { email, password } = credentials;
        const user = await this.authRepository.findOne({ where: { email }, select: ['id', 'password', 'email', 'role'] });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Email o password incorrectos. Intente nuevamente');
        }
        const userPayload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            role: user.role
        };
        const token = this.jwtService.sign(userPayload);
        return { token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_repository_1.UsersRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map