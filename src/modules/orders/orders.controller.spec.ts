import { Test } from "@nestjs/testing";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { CreateOrdersDto } from "./dtos/CreateOrders.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenGuard } from "../../guards/authToken.guard";

describe('OrdersController', () => {

    let ordersController: OrdersController;
    let mockOrdersService: OrdersService;

    const mockOrders2: CreateOrdersDto = {
        id: '1234fs-5678qw-9012ew-3456tr',
        orderDetails: [
            {productId: '2569j-3456tr-9012ew-1234fs'},
            {productId: '3690j-3456tr-9012ew-1234fs'},
        ],
    };
        

    const mockOrders = [
        {
            createdAt: new Date(),
            user: {
                id: '1234fs-5678qw-9012ew-3456tr',
                name: 'John Doe',
            },
            ordersDetails: [
                {
                    id: '2569j-3456tr-9012ew-1234fs',
                    name: 'product 1',
                    price: '100',
                    productsId: '2569j-3456tr-9012ew-1234fs',
                }
            ],
        }
    ];

    beforeEach( async () => {

        mockOrdersService = {
            getOrders: (id: string) => Promise.resolve(mockOrders),
            addOrder: () => Promise.resolve([]),
        } as unknown as jest.Mocked<OrdersService>;
        
        const module = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                OrdersService,
                {
                    provide: OrdersService,
                    useValue: mockOrdersService,
                },
                { provide: JwtService, useValue: {} }
            ],
            })
            .overrideGuard(AuthTokenGuard)
            .useValue({ canActivate: () => true 
        }).compile();

        ordersController = module.get<OrdersController>(OrdersController);
      
    });

    it('Debe estar definido', () => {
        expect(ordersController).toBeDefined();
    });

    it('Debe devolver una orden de compra a partir de un id', async () => {
        const result = await ordersController.getOrders('1234fs-5678qw-9012ew-3456tr1');
        expect(result).toEqual(mockOrders);
    });

    it('Debe agregar una orden de compra', async () => {
        const result = await ordersController.addOrder(mockOrders2);
        expect(result).toEqual([]);
    });

});