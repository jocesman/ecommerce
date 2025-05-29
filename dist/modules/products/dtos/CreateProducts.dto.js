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
exports.CreateProductsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateProductsDto {
    name;
    description;
    price;
    stock;
    categoriesId;
    imgUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, minLength: 3, maxLength: 80 }, description: { required: true, type: () => String, minLength: 3, maxLength: 100 }, price: { required: true, type: () => String, minimum: 0.01 }, stock: { required: true, type: () => String, minimum: 0.01 }, categoriesId: { required: true, type: () => String, format: "uuid" }, imgUrl: { required: false, type: () => String, format: "uri" } };
    }
}
exports.CreateProductsDto = CreateProductsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres de longitud' }),
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del producto, debe tener entre 3 y 80 caracteres de longitud',
        example: 'iPhone 14 Pro',
        required: true,
    }),
    __metadata("design:type", String)
], CreateProductsDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripción es obligatoria' }),
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(3, 100, { message: 'La descripción debe tener entre 3 y 100 caracteres de longitud' }),
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del producto, debe tener entre 3 y 100 caracteres de longitud',
        example: 'iPhone 14 Pro, 64GB RAM, 128GB SSD, Teléfono móvil, Wi-Fi, Bluetooth, Código QR, Sin conexión',
        required: true,
    }),
    __metadata("design:type", String)
], CreateProductsDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El precio es obligatorio' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = parseFloat(value);
        if (isNaN(num))
            return value;
        return num.toFixed(2);
    }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número válido' }),
    (0, class_validator_1.Min)(0.01, { message: 'El precio debe ser mayor a 0' }),
    (0, swagger_1.ApiProperty)({
        description: 'Precio del producto, debe ser un número válido y ser mayor a 0',
        example: '100.00',
        required: true,
    }),
    __metadata("design:type", String)
], CreateProductsDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El Stock es obligatorio' }),
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = parseFloat(value);
        if (isNaN(num))
            return value;
        return num.toFixed(2);
    }),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value), { toClassOnly: true }),
    (0, class_validator_1.IsNumber)({}, { message: 'El stock debe ser un número válido' }),
    (0, class_validator_1.Min)(0.01, { message: 'El stock debe ser mayor a 0' }),
    (0, swagger_1.ApiProperty)({
        description: 'Stock del producto, debe ser un número válido y mayor a 0',
        example: '100.00',
        required: true,
    }),
    __metadata("design:type", String)
], CreateProductsDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoria es obligatoria' }),
    (0, class_validator_1.IsString)({ message: 'La categoria debe ser una cadena de texto' }),
    (0, class_validator_1.IsUUID)('4', { message: 'La categoria debe ser válido, tipo UUID v4' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID de la categoria del producto, debe ser válido y ser una cadena de texto',
        example: '1234fs-5678qw-9012ew-3456tr',
        required: true,
    }),
    __metadata("design:type", String)
], CreateProductsDto.prototype, "categoriesId", void 0);
__decorate([
    (0, class_validator_1.IsUrl)({}, { message: 'La imagen debe ser una URL válida' }),
    (0, class_validator_1.IsString)({ message: 'La imagen debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'URL de la imagen del producto, opcional',
        example: 'https://www.example.com/image.jpg',
    }),
    __metadata("design:type", String)
], CreateProductsDto.prototype, "imgUrl", void 0);
//# sourceMappingURL=CreateProducts.dto.js.map