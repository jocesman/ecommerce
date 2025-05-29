import { OrdersRepository } from "./orders.repository";
import { CreateOrdersDto } from "./dtos/CreateOrders.dto";
export declare class OrdersService {
    private OrdersRepository;
    constructor(OrdersRepository: OrdersRepository);
    getOrders(id: string): Promise<import("../../entities/orders.entity").Orders[]>;
    addOrder(orderBuy: CreateOrdersDto): Promise<any>;
}
