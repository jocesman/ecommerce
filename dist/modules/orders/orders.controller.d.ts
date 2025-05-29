import { OrdersService } from "./orders.service";
import { CreateOrdersDto } from "./dtos/CreateOrders.dto";
export declare class OrdersController {
    private readonly OrdersService;
    constructor(OrdersService: OrdersService);
    getOrders(id: string): Promise<import("../../entities/orders.entity").Orders[]>;
    addOrder(orderBuy: CreateOrdersDto): Promise<any>;
}
