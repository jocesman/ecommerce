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
exports.LoginUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginUserDto {
    email;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String } };
    }
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es obligatorio' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un correo electrónico válido' }),
    (0, swagger_1.ApiProperty)({
        description: 'Correo electrónico del usuario, ej. john.doe@example.com',
        example: 'john.doe@example.com',
        required: true,
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es obligatoria' }),
    (0, swagger_1.ApiProperty)({
        description: 'Contraseña del usuario',
        required: true,
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
//# sourceMappingURL=LoginUserDto.dto.js.map