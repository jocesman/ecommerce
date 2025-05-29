import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { OrderDetails } from '../../entities/orderDetails.entity';
import { Orders } from "../../entities/orders.entity";
import { Products } from "../..//entities/products.entity";
import { Users } from "../..//entities/users.entity";
import { Repository } from "typeorm";
import { CreateOrdersDto } from "./dtos/CreateOrders.dto";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Users) private readonly UsersRepository: Repository<Users>,
        @InjectRepository(Products) private readonly ProductsRepository: Repository<Products>,
        @InjectRepository(Orders) private readonly OrdersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails) private readonly OrderDetailsRepository: Repository<OrderDetails>,
    ) {}

    async getOrders(id: string): Promise<Orders[]> {
        // Validar que id sea válido
        if (!isUUID(id)) {
            throw new BadRequestException('El ID debe ser válido, tipo UUID v4');
        }

        // Obtener el usuario con el id
        // const user = await this.UsersRepository.findOne({
        //     where: { id },
        //   });
        
        // if (!user) {
        //     throw new BadRequestException('Usuario no tiene órdenes');
        // }

        // Obtener las ordenes del usuario
        // const orders = await this.OrdersRepository.find({
        //     where: { id },
        //     relations: ['user', 'orderDetails', 'orderDetails.products']
        //   });

        // return (orders);

        const orders = await this.OrdersRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.user', 'user') // Carga la relación user
            .leftJoinAndSelect('order.orderDetails', 'orderDetails') // Carga orderDetails
            .leftJoinAndSelect('orderDetails.products', 'products') // Carga products
            .select([
                'order.id', // Campos de Order 'order.id AS orderId', // Campos de Order
                'order.createdAt',
                'user.id', // Campos específicos de user
                'user.name', 
                'orderDetails.id', // Campos de orderDetails
                'orderDetails.price',
                'products.id', // Campos de products
                'products.name',
            ])
            .where('order.id = :id', { id })
            .getMany();
    if (orders.length === 0) throw new BadRequestException('No se encontraron órdenes para el ID proporcionado');            
    return orders;
    }

    async addOrder(orderBuy: CreateOrdersDto): Promise<Orders | string | any> {
        // Validar que id sea válido
        if (!isUUID(orderBuy.id)) {
            throw new BadRequestException('El ID debe ser válido');
        }

        // Obtener el usuario con el id
        const user = await this.UsersRepository.findOne({
            where: { id: orderBuy.id },
            select: ['id', 'name']
          });

        if (!user) {
            throw new BadRequestException('El usuario no existe');
        }

        //Obtener los productos del usuario
        let newOrder = new Orders();
        let neworderDetail = new OrderDetails();
        
        neworderDetail.price = "0.00";
        await this.OrderDetailsRepository.save(neworderDetail);
        newOrder.createdAt = new Date(); 
        newOrder.user = user; 
        newOrder.orderDetails = neworderDetail;
        await this.OrdersRepository.save(newOrder);

        let suma: number = 0;
        let bajarStock: number = 0;
        let colaProducts: any[] = [];
        let colaOrderDetails: any[] = [];
        let compra: any[] = [];

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
                colaProducts.push({id:productExist.id,
                     name: productExist.name});

                colaOrderDetails.push(compra[0].id);
            }
        }

        neworderDetail.products = colaProducts;
        neworderDetail.orders = newOrder;
        if (suma > 0) {
            await this.OrdersRepository.save(newOrder);
            await this.OrderDetailsRepository.save(neworderDetail); 
        } else {
            throw new BadRequestException('No hay productos en el carrito o no hay stock disponible');
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
}