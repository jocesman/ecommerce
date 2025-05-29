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
exports.OrderDetailDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OrderDetailDto {
    productId;
    static _OPENAPI_METADATA_FACTORY() {
        return { productId: { required: true, type: () => String, format: "uuid" } };
    }
}
exports.OrderDetailDto = OrderDetailDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'El ID del producto debe ser válido, tipo UUID v4' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El id del producto es obligatorio' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID del producto que se desea agregar al pedido',
        example: '1234fs-5678qw-9012ew-3456tr',
        required: true,
    }),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "productId", void 0);
//# sourceMappingURL=OrderDetailDto.dto.js.map