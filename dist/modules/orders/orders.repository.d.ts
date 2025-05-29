import { OrderDetails } from '../../entities/orderDetails.entity';
import { Orders } from "../../entities/orders.entity";
import { Products } from "../..//entities/products.entity";
import { Users } from "../..//entities/users.entity";
import { Repository } from "typeorm";
import { CreateOrdersDto } from "./dtos/CreateOrders.dto";
export declare class OrdersRepository {
    private readonly UsersRepository;
    private readonly ProductsRepository;
    private readonly OrdersRepository;
    private readonly OrderDetailsRepository;
    constructor(UsersRepository: Repository<Users>, ProductsRepository: Repository<Products>, OrdersRepository: Repository<Orders>, OrderDetailsRepository: Repository<OrderDetails>);
    getOrders(id: string): Promise<Orders[]>;
    addOrder(orderBuy: CreateOrdersDto): Promise<Orders | string | any>;
}
