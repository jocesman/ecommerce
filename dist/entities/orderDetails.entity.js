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
exports.OrderDetails = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("./products.entity");
let OrderDetails = class OrderDetails {
    id;
    price;
    orders;
    products;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, price: { required: true, type: () => String }, orders: { required: true, type: () => require("./orders.entity").Orders }, products: { required: true, type: () => [require("./products.entity").Products] } };
    }
};
exports.OrderDetails = OrderDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetails.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: '0.00'
    }),
    __metadata("design:type", String)
], OrderDetails.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orders_entity_1.Orders, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", orders_entity_1.Orders)
], OrderDetails.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => products_entity_1.Products, (products) => products.orderDetails, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], OrderDetails.prototype, "products", void 0);
exports.OrderDetails = OrderDetails = __decorate([
    (0, typeorm_1.Entity)('orderDetails')
], OrderDetails);
//# sourceMappingURL=orderDetails.entity.js.map