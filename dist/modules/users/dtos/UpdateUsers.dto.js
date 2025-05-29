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
exports.UpdateUsersDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const roles_enum_1 = require("../../../roles.enum");
class UpdateUsersDto {
    name;
    country;
    city;
    address;
    phone;
    email;
    role;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, country: { required: true, type: () => String, minLength: 3, maxLength: 20 }, city: { required: true, type: () => String, minLength: 3, maxLength: 20 }, address: { required: true, type: () => String, minLength: 3, maxLength: 80 }, phone: { required: true, type: () => String, pattern: "/^\\+?[0-9\\s\\-()]{7,20}$/" }, email: { required: true, type: () => String, format: "email" }, role: { required: true, enum: require("../../../roles.enum").Role } };
    }
}
exports.UpdateUsersDto = UpdateUsersDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres de longitud' }),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El país es obligatorio' }),
    (0, class_validator_1.IsString)({ message: 'El país debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 20, { message: 'El nombre del país debe tener entre 3 y 20 caracteres de longitud' }),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La ciudad es obligatoria' }),
    (0, class_validator_1.IsString)({ message: 'La ciudad debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 20, { message: 'El nombre de la ciudad debe tener entre 3 y 20 caracteres de longitud' }),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La dirección es obligatoria' }),
    (0, class_validator_1.IsString)({ message: 'La dirección debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres de longitud' }),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El teléfono es obligatorio' }),
    (0, class_validator_1.IsString)({ message: 'El teléfono debe ser una cadena de texto' }),
    (0, class_validator_1.Matches)(/^\+?[0-9\s\-()]{7,20}$/, {
        message: 'El número de teléfono no tiene un formato válido, mínimo 7 caracteres, máximo 20 caracteres, ej. +57 310 123 4567, (031) 456-7890, 310-123-4567, 3112345678)',
    }),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es obligatorio' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Debe proporcionar un correo electrónico válido' }),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El rol es obligatorio' }),
    (0, class_validator_1.IsEnum)(roles_enum_1.Role, { message: 'El rol debe ser uno de los siguientes: admin, user' }),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "role", void 0);
//# sourceMappingURL=UpdateUsers.dto.js.map