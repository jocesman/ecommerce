"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Header de autorización no encontrado');
        }
        const isBasicAuth = authHeader.startsWith('Basic:');
        if (!isBasicAuth) {
            throw new common_1.UnauthorizedException('El header debe comenzar con "Basic:"');
        }
        const authValue = authHeader.slice(6).trim();
        const hasCorrectFormat = authValue.includes(':');
        if (!hasCorrectFormat) {
            throw new common_1.UnauthorizedException('Formato incorrecto. Debe ser "Basic: <email>:<password>"');
        }
        const [email, password] = authValue.split(':');
        if (!email || !password) {
            throw new common_1.UnauthorizedException('Email o password incorrectos');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map