import { Test } from "@nestjs/testing";
import { ProductsRepository } from "../products/products.repository";
import { UsersRepository } from "../users/users.repository";
import { OrdersRepository } from "./orders.repository";
import { OrdersService } from "./orders.service";


describe('OrdersService', () => {
    let service: OrdersService;
    let ordersRepository: jest.Mocked<OrdersRepository>;
    let usersRepository: jest.Mocked<UsersRepository>;
    let productsRepository: jest.Mocked<ProductsRepository>;

    const mockOrdersRepository = {
        getOrders: jest.fn(),
        addOrder: jest.fn(),
    } as unknown as jest.Mocked<OrdersRepository>;

    const mockUsersRepository = {}
    const mockProductsRepository = {}
    const mockOrderDetailsRepository = {}

    const mockOrders:any= [
        {
            ordersId: '1234fs-5678qw-9012ew-3456tr',
            createdAt: new Date(),
            user: {
                id: '1234fs-5678qw-9012ew-3456tr',
                name: 'John Doe',
            },
            orderDetails: [
                {
                    id: '2569j-3456tr-9012ew-1234fs',
                    name: 'product 1',
                    price: 100,
                    image: 'https://i.imgur.com/123.png',
                    description: 'product 1 description',
                },
                {
                    id: '3690j-3456tr-9012ew-1234fs',
                    name: 'product 2',
                    price: 200,
                    image: 'https://i.imgur.com/456.png',
                    description: 'product 2 description',
                }  
            ],
        }
    ];

    const mockOrderBuy = {
        usersid: '1234fs-5678qw-9012ew-3456tr',
        products: [
            {productId: '2569j-3456tr-9012ew-1234fs'},
            {productId: '3690j-3456tr-9012ew-1234fs'},
        ],
    } as any;

beforeEach(async () => {
    const module = await Test.createTestingModule({
        providers: [
            OrdersService,
            {
                provide: OrdersRepository,
                useValue: mockOrdersRepository,
            },
            {
                provide: UsersRepository,
                useValue: mockUsersRepository,
            },
            {
                provide: ProductsRepository,
                useValue: mockProductsRepository,
            }
        ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get(OrdersRepository);
    usersRepository = module.get(UsersRepository);
    productsRepository = module.get(ProductsRepository);
});

it('Servicio está definido', async () => {
    expect(service).toBeDefined();
});

it('getOrders debe devolver un array de pedidos', async () => {
    const result = mockOrders;
    ordersRepository.getOrders.mockResolvedValue(result);

    const orders = await service.getOrders(mockOrders.id);
    expect(orders).toEqual(result);
    expect(ordersRepository.getOrders).toHaveBeenCalled();
});

it('addOrders debe agregar un pedido', async () => {
    const orderBuy = mockOrderBuy;
    mockOrdersRepository.addOrder.mockResolvedValue(orderBuy); 

    const result = await service.addOrder(orderBuy);
    expect(result).toEqual(orderBuy);
    expect(mockOrdersRepository.addOrder).toHaveBeenCalledWith(orderBuy);
});
});

    