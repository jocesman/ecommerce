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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const orderDetails_entity_1 = require("../../entities/orderDetails.entity");
const orders_entity_1 = require("../../entities/orders.entity");
const products_entity_1 = require("../..//entities/products.entity");
const users_entity_1 = require("../..//entities/users.entity");
const typeorm_2 = require("typeorm");
let OrdersRepository = class OrdersRepository {
    UsersRepository;
    ProductsRepository;
    OrdersRepository;
    OrderDetailsRepository;
    constructor(UsersRepository, ProductsRepository, OrdersRepository, OrderDetailsRepository) {
        this.UsersRepository = UsersRepository;
        this.ProductsRepository = ProductsRepository;
        this.OrdersRepository = OrdersRepository;
        this.OrderDetailsRepository = OrderDetailsRepository;
    }
    async getOrders(id) {
        if (!(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('El ID debe ser válido, tipo UUID v4');
        }
        const orders = await this.OrdersRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.products', 'products')
            .select([
            'order.id',
            'order.createdAt',
            'user.id',
            'user.name',
            'orderDetails.id',
            'orderDetails.price',
            'products.id',
            'products.name',
        ])
            .where('order.id = :id', { id })
            .getMany();
        if (orders.length === 0)
            throw new common_1.BadRequestException('No se encontraron órdenes para el ID proporcionado');
        return orders;
    }
    async addOrder(orderBuy) {
        if (!(0, class_validator_1.isUUID)(orderBuy.id)) {
            throw new common_1.BadRequestException('El ID debe ser válido');
        }
        const user = await this.UsersRepository.findOne({
            where: { id: orderBuy.id },
            select: ['id', 'name']
        });
        if (!user) {
            throw new common_1.BadRequestException('El usuario no existe');
        }
        let newOrder = new orders_entity_1.Orders();
        let neworderDetail = new orderDetails_entity_1.OrderDetails();
        neworderDetail.price = "0.00";
        await this.OrderDetailsRepository.save(neworderDetail);
        newOrder.createdAt = new Date();
        newOrder.user = user;
        newOrder.orderDetails = neworderDetail;
        await this.OrdersRepository.save(newOrder);
        let suma = 0;
        let bajarStock = 0;
        let colaProducts = [];
        let colaOrderDetails = [];
        let compra = [];
        for (const product of orderBuy.orderDetails) {
            const productExist = await this.ProductsRepository.findOne({
                where: { id: product.productId },
                select: ['id', 'name', 'description', 'price', 'stock', 'categories', 'orderDetails']
            });
            if (productExist && Number(productExist.stock) > 0) {
                suma += Number(productExist.price);
                bajarStock = Number(productExist.stock);
                productExist.stock = (bajarStock - 1).toString();
                await this.ProductsRepository.save(productExist);
                neworderDetail.price = suma.toString();
                compra = [{
                        id: productExist.id,
                        name: productExist.name,
                        price: productExist.price,
                    }];
                colaProducts.push({ id: productExist.id,
                    name: productExist.name });
                colaOrderDetails.push(compra[0].id);
            }
        }
        neworderDetail.products = colaProducts;
        neworderDetail.orders = newOrder;
        if (suma > 0) {
            await this.OrdersRepository.save(newOrder);
            await this.OrderDetailsRepository.save(neworderDetail);
        }
        else {
            throw new common_1.BadRequestException('No hay productos en el carrito o no hay stock disponible');
        }
        const detalleOrder = {
            userId: user.id,
            userName: user.name,
            createdAt: newOrder.createdAt,
            orderId: newOrder.id,
            OrderDetails: neworderDetail.id,
            price: suma,
            productos: colaProducts
        };
        return detalleOrder;
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(2, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(3, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map