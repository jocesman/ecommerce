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
exports.CategoryDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CategoryDto {
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 15 } };
    }
}
exports.CategoryDto = CategoryDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoria es obligatoria' }),
    (0, class_validator_1.IsString)({ message: 'La categoria debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 15, { message: 'La categoria debe tener entre 3 y 15 caracteres de longitud' }),
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la categoria, debe tener entre 3 y 15 caracteres de longitud',
        example: 'Electronics',
        required: true,
    }),
    __metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
//# sourceMappingURL=Category.dto.js.map