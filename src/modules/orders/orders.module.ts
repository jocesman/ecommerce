import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Orders } from '../../entities/orders.entity';
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrdersRepository } from "./orders.repository";
import { Users } from '../../entities/users.entity';
import { Products } from '../../entities/products.entity';
import { OrderDetails } from '../../entities/orderDetails.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Orders, Users, Products, OrderDetails])],
    providers: [OrdersService, OrdersRepository],
    controllers: [OrdersController]
})
export class OrdersModule {}
