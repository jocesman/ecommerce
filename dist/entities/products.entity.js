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
exports.Products = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const orderDetails_entity_1 = require("./orderDetails.entity");
const categories_entity_1 = require("./categories.entity");
const files_entity_1 = require("./files.entity");
let Products = class Products {
    id;
    name;
    description;
    price;
    stock;
    imgUrl;
    files;
    categories;
    orderDetails;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, price: { required: true, type: () => String }, stock: { required: true, type: () => String }, imgUrl: { required: true, type: () => String }, files: { required: true, type: () => [require("./files.entity").Files] }, categories: { required: true, type: () => require("./categories.entity").Categories }, orderDetails: { required: true, type: () => [require("./orderDetails.entity").OrderDetails] } };
    }
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDecimal)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => files_entity_1.Files, (file) => file.products, {
        cascade: true
    }),
    (0, typeorm_1.JoinTable)({
        name: 'product_files',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Products.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (categories) => categories.products, {
        onDelete: 'SET NULL',
        nullable: true
    }),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => orderDetails_entity_1.OrderDetails, (orderDetails) => orderDetails.products),
    (0, typeorm_1.JoinTable)({
        name: 'product_order_details',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Products.prototype, "orderDetails", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)('products')
], Products);
//# sourceMappingURL=products.entity.js.map