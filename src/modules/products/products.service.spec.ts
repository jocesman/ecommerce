import { Products } from "../../entities/products.entity";
import { ProductsService } from "./products.service";
import { Categories } from "../../entities/categories.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";

const mockProduct: Products[] = [
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


describe ('ProductsService',() => {

    let service: ProductsService;
    let productsRepository: jest.Mocked<ProductsService>;

    const mockProductsRepository = {
        getProducts: jest.fn(),
        getProductsById: jest.fn(),
        createProduct: jest.fn(),
        deleteProduct: jest.fn(),
        updateProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

    const mockJwtService = {
        sign: jest.fn(),
        verify: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ProductsService,
                    useValue: mockProductsRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                }
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        productsRepository = module.get(ProductsService);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('getProducts debe devolver un array de productos', async () => {
        const result:any = mockProduct;
        productsRepository.getProducts.mockResolvedValue(result);

        let page = 1; let limit = 10;

        const products = await service.getProducts(page, limit);
        expect(products).toEqual(result);
    });

    it('getProductsById debe devolver un producto por ID', async () => {
        const product = mockProduct[0];
        
        productsRepository.getProductsById.mockResolvedValue(product);

        const result = await service.getProductsById('1456fs-7890qw-9012ew-3456tr');
        expect(result).toEqual(product);
        expect(productsRepository.getProductsById).toHaveBeenCalledWith('1456fs-7890qw-9012ew-3456tr');
    });

    it('createProduct debe crear un producto si no existe previamente', async () => {

        const mockProduct: any = {
            id: '2582fs-3456tr-9012ew-1234fs',
            name: 'nuevo producto',
            description: 'descripción',
            price: '100',
            stock: '10',
            imgUrl: 'http://img.com/nuevo.jpg',
            categoriesId: '36987f-3456tr-9012ew-1234fs',
        };

        jest.spyOn(productsRepository, 'createProduct').mockResolvedValue(mockProduct);
        const result = await service.createProduct(mockProduct);
        expect(result).toEqual(mockProduct);
        expect(productsRepository.createProduct).toHaveBeenCalled();

    });

    it('createProduct debe crear un producto nuevo y verificar que existe', async () => {
        // Datos para el nuevo producto
        const newProductDto: any = {
            name: 'Producto C',
            description: 'Descripción del producto C',
            price: '300',
            stock: '30',
            imgUrl: 'http://img.com/c.jpg',
        };

        // Producto creado (simulando respuesta de BD con ID generado)
        const createdProduct: Products = {
            id: '9876zx-5432as-1098qw-7654df',
            name: newProductDto.name,
            description: newProductDto.description,
            price: newProductDto.price,
            stock: newProductDto.stock,
            imgUrl: '',
            files: [],
            categories: {
                id: '25895f-3456tr-9012ew-1234fs',
                name: 'Categoría A',
            } as Categories,
            orderDetails: [],
        };

        // Mock de la respuesta del repositorio al crear el producto
        mockProductsRepository.createProduct.mockResolvedValue(createdProduct);
        
        // Ejecutamos el servicio para crear el producto
        const result = await service.createProduct(newProductDto);
        
        // Verificamos que el resultado sea el producto creado con ID
        expect(result).toEqual(createdProduct);
        
        // Verificamos que se haya llamado al repositorio con los datos correctos
        expect(mockProductsRepository.createProduct).toHaveBeenCalledWith(newProductDto);
        
        // Verificamos que el producto existe buscándolo por ID
        mockProductsRepository.getProductsById.mockResolvedValue(createdProduct);
        
        const foundProduct = await service.getProductsById(createdProduct.id);
        expect(foundProduct).toEqual(createdProduct);
    });

    it('updateProduct debe actualizar un producto existente y verificar los cambios', async () => {
        // Producto original
        const originalProduct = mockProduct[0];
        
        // Datos para actualizar el producto
        const updateProductDto: any = {
            name: 'Producto A Actualizado',
            description: 'Descripción actualizada del producto A',
            price: '150',
            stock: '15',
            imgUrl: '',
            categoryId: '25895f-3456tr-9012ew-1234fs'
        };
        
        // Producto actualizado
        const updatedProducts: any = {
            ...originalProduct,
            name: updateProductDto.name,
            description: updateProductDto.description,
            price: updateProductDto.price,
            stock: updateProductDto.stock,
            imgUrl: updateProductDto.imgUrl
        };
        
        // Mock de la respuesta del repositorio al actualizar el producto
        mockProductsRepository.updateProduct.mockResolvedValue(updatedProducts);
        
        // Ejecutamos el servicio para actualizar el producto
        const productId = originalProduct.id;
        const result = await service.updateProduct(productId, updateProductDto);
        
        // Verificamos que el resultado sea el producto actualizado
        expect(result).toEqual(updatedProducts);
        
        // Verificamos que se haya llamado al repositorio con los datos y ID correctos
        expect(mockProductsRepository.updateProduct).toHaveBeenCalledWith(productId, updateProductDto);
        
        // Verificamos que el producto existe con los cambios realizados
        mockProductsRepository.getProductsById.mockResolvedValue(updatedProducts);
        
        const foundProduct = await service.getProductsById(productId);
        expect(foundProduct).toEqual(updatedProducts);
        expect(foundProduct.name).toBe(updateProductDto.name);
        expect(foundProduct.price).toBe(updateProductDto.price);
    });
    
    it('deleteProduct debe eliminar un producto existente y verificar que ya no existe', async () => {
        // Producto a eliminar
        const productToDelete = mockProduct[0];
        const productId = productToDelete.id;
        
        // Mock de la respuesta del repositorio al eliminar el producto
        mockProductsRepository.deleteProduct.mockResolvedValue({ affected: 1 } as Promise<string> | any);
        
        // Ejecutamos el servicio para eliminar el producto
        const result = await service.deleteProduct(productId);
        
        // Verificamos que se devuelva un objeto con affected: 1 (simulando que se afectó una fila)
        expect(result).toEqual({ affected: 1 });
        
        // Verificamos que se haya llamado al repositorio con el ID correcto
        expect(mockProductsRepository.deleteProduct).toHaveBeenCalledWith(productId);
        
        // Simulamos que el producto ya no existe después de eliminarlo
        mockProductsRepository.getProductsById.mockResolvedValue(null);
        
        // Verificamos que el producto ya no se puede encontrar por ID
        const foundProduct = await service.getProductsById(productId);
        expect(foundProduct).toBeNull();
    });

    
})
