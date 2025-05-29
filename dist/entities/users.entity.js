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
exports.Users = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const roles_enum_1 = require("../roles.enum");
let Users = class Users {
    id;
    name;
    email;
    password;
    phone;
    country;
    address;
    city;
    role;
    orders;
    fecnac;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, phone: { required: true, type: () => String }, country: { required: true, type: () => String }, address: { required: true, type: () => String }, city: { required: true, type: () => String }, role: { required: true, enum: require("../roles.enum").Role }, orders: { required: true, type: () => [require("./orders.entity").Orders] }, fecnac: { required: true, type: () => Date } };
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 50
    }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
        length: 50
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 255
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 20
    }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 50,
    }),
    __metadata("design:type", String)
], Users.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 70,
    }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 50,
    }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        length: 10,
        default: roles_enum_1.Role.User
    }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Orders, (orders) => orders.user, {
        cascade: ['remove'],
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Users.prototype, "fecnac", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=users.entity.js.map