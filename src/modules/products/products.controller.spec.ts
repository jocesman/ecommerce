import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenGuard } from "../../guards/authToken.guard";
import { Products } from "../../entities/products.entity";
import { Categories } from "../../entities/categories.entity";
import { CreateProductsDto } from "./dtos/CreateProducts.dto";

const mockProduct: CreateProductsDto = {
    name: 'Producto A',
    description: 'Descripción del producto A',
    price: '100',
    stock: '10',
    imgUrl: '',
    categoriesId : '25895f-3456tr-9012ew-1234fs',
};

const mockProducts: Products[] = [
    {
        id: '1456fs-7890qw-9012ew-3456tr',
        name: 'Producto A',
        description: 'Descripción del producto A',
        price: '100',
        stock: '10',
        imgUrl: 'http://img.com/a.jpg',
        files: [],
        categories: {
            id: '25895f-3456tr-9012ew-1234fs',
            name: 'Categoría A',
        } as Categories,
        orderDetails: [],
    },
    {
        id: '7890qw-9012ew-3456tr-1456fs',
        name: 'Producto B',
        description: 'Descripción del producto B', 
        price: '200',
        stock: '20',
        imgUrl: 'http://img.com/b.jpg',
        files: [],
        categories: {
            id: '36987f-3456tr-9012ew-1234fs',
            name: 'Categoría B',
        } as Categories,
        orderDetails: [],
    }
];

describe('ProductsController', () => {

    let productsController: ProductsController;
    let mockProductsService: ProductsService;

    mockProductsService = {
        getProducts: () => Promise.resolve([]),
        getProductsById: (id: string) => Promise.resolve(mockProducts[0]),
        createProduct: (mockProduct) => Promise.resolve( {...mockProduct, id: '1999fs-5678qw-9012ew-3456tr'} as Products),
        deleteProduct: (id: string) => Promise.resolve('Product deleted successfully'),
        updateProduct: (id: string, mockProducts: CreateProductsDto) => Promise.resolve(mockProducts[0]),
    } as unknown as jest.Mocked<ProductsService>;

    beforeEach( async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                ProductsService,
                {
                    provide: ProductsService,
                    useValue: mockProductsService,
                },
                { provide: JwtService, useValue: {} }
            ],
            })
                .overrideGuard(AuthTokenGuard)
                .useValue({ canActivate: () => true 
            }).compile();

        productsController = module.get<ProductsController>(ProductsController);

    });

    it('Debe estar definido', () => {
        expect(productsController).toBeDefined();
    });

    it('Debe devolver un array de productos', async () => {
        const result = await productsController.getProducts();
        expect(result).toEqual([]);
    });

    it('Debe devolver un producto por ID', async () => {
        const result = await productsController.getProductsById('1456fs-7890qw-9012ew-3456tr');
        expect(result).toEqual(
            {
                id: '1456fs-7890qw-9012ew-3456tr',
                name: 'Producto A',
                description: 'Descripción del producto A',
                price: '100',
                stock: '10',
                imgUrl: 'http://img.com/a.jpg',
                files: [],
                categories: {
                    id: '25895f-3456tr-9012ew-1234fs',
                    name: 'Categoría A',
                } as Categories,
                orderDetails: [],
            }
        );
    });

    it('Debe crear un producto si no existe previamente', async () => {
        const result = await productsController.createProduct(mockProduct);
        expect(result).toEqual(
            expect.objectContaining({
              ...mockProduct,
              id: '1999fs-5678qw-9012ew-3456tr',
            }),
          );
    });

    it('Debe actualizar un producto si existe', async () => {
        const result = await productsController.updateProduct(
            '1456fs-7890qw-9012ew-3456tr',
            mockProduct,
        );
        expect(result).toEqual(mockProduct[0]);
    });

    it('Debe eliminar un producto si existe', async () => {
        const result = await productsController.deleteProduct('1456fs-7890qw-9012ew-3456tr');
        expect(result).toEqual('Product deleted successfully');
    });

});