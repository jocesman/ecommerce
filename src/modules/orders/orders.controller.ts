import { Body, Controller, Get, Injectable, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrdersDto } from "./dtos/CreateOrders.dto";
import { AuthTokenGuard } from "../../guards/authToken.guard";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    
    constructor(private readonly OrdersService: OrdersService) {}

    @Get(':id')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Obtiene el pedido por ID de Orden de Compra',
        description: 'Obtiene el pedido por ID de Orden de Compra y su detalle. Requiere autenticación mediante token.'
    })
    getOrders(@Param('id') id: string) {
        return this.OrdersService.getOrders(id);
    }

    @Post()
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Crea una orden de compra',
        description: 'Permite registrar una nueva orden de compra en el sistema. Se requiere enviar los datos en el cuerpo según el DTO y estar autenticado.'
    })
    addOrder(@Body() orderBuy: CreateOrdersDto) {
        return this.OrdersService.addOrder(orderBuy);
    }

}