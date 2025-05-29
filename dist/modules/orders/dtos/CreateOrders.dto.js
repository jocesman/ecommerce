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
exports.CreateOrdersDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const OrderDetailDto_dto_1 = require("./OrderDetailDto.dto");
const swagger_1 = require("@nestjs/swagger");
class CreateOrdersDto {
    id;
    orderDetails;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, format: "uuid" }, orderDetails: { required: true, type: () => [require("./OrderDetailDto.dto").OrderDetailDto], minItems: 1 } };
    }
}
exports.CreateOrdersDto = CreateOrdersDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'El ID del usuario debe ser válido, tipo UUID v4' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El id del usuario es obligatorio' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID del usuario que realiza la orden',
        example: '1234fs-5678qw-9012ew-3456tr',
        required: true,
    }),
    __metadata("design:type", String)
], CreateOrdersDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsArray)({ message: 'OrderDetails debe ser un array' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'OrderDetails debe contener al menos un producto' }),
    (0, class_transformer_1.Type)(() => OrderDetailDto_dto_1.OrderDetailDto),
    (0, class_validator_1.IsNotEmpty)({ message: 'OrderDetails debe contener al menos un producto' }),
    (0, swagger_1.ApiProperty)({
        description: 'Array de detalles de la orden, mínimo un elemento',
        example: [
            { productId: '1234fs-5256qw-9012ew-3456tr' },
            { productId: '1567fs-5678qw-9259ew-3456tr' },
            { productId: '1890s-5678qw-9000ew-3456tr' },
        ],
        required: true,
    }),
    __metadata("design:type", Array)
], CreateOrdersDto.prototype, "orderDetails", void 0);
//# sourceMappingURL=CreateOrders.dto.js.map