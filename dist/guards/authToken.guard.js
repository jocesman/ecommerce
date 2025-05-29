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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthTokenGuard = class AuthTokenGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Header de autorización no encontrado');
        }
        const isBasicAuth = authHeader.startsWith('Bearer ');
        if (!isBasicAuth) {
            throw new common_1.UnauthorizedException('Bearer token no válido (Formato incorrecto)');
        }
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Header de autorización no encontrado');
        }
        try {
            const secret = process.env.JWT_SECRET;
            const payload = await this.jwtService.verify(token, { secret });
            payload.iat = new Date(payload.iat * 1000).toLocaleString();
            payload.exp = new Date(payload.exp * 1000).toLocaleString();
            request.user = payload;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Bearer token no válido- ' + error);
        }
    }
};
exports.AuthTokenGuard = AuthTokenGuard;
exports.AuthTokenGuard = AuthTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthTokenGuard);
//# sourceMappingURL=authToken.guard.js.map