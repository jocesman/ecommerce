import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";  
import { CreateOrdersDto } from "./dtos/CreateOrders.dto";

@Injectable()
export class OrdersService {
    constructor(private OrdersRepository: OrdersRepository) {}

    getOrders(id: string) {
        return this.OrdersRepository.getOrders(id);
    }

    addOrder(orderBuy: CreateOrdersDto) {
        return this.OrdersRepository.addOrder(orderBuy);
    }
}