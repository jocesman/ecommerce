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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const CreateOrders_dto_1 = require("./dtos/CreateOrders.dto");
const authToken_guard_1 = require("../../guards/authToken.guard");
const swagger_1 = require("@nestjs/swagger");
let OrdersController = class OrdersController {
    OrdersService;
    constructor(OrdersService) {
        this.OrdersService = OrdersService;
    }
    getOrders(id) {
        return this.OrdersService.getOrders(id);
    }
    addOrder(orderBuy) {
        return this.OrdersService.addOrder(orderBuy);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene el pedido por ID de Orden de Compra',
        description: 'Obtiene el pedido por ID de Orden de Compra y su detalle. Requiere autenticación mediante token.'
    }),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/orders.entity").Orders] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crea una orden de compra',
        description: 'Permite registrar una nueva orden de compra en el sistema. Se requiere enviar los datos en el cuerpo según el DTO y estar autenticado.'
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrders_dto_1.CreateOrdersDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "addOrder", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map