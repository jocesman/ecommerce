import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";
import { JwtService } from "@nestjs/jwt";
import { Categories } from "../../entities/categories.entity";

const mockCategories: Omit<Categories, 'products'>[] = [
    { id: '1234fs-5678qw-9012ew-3456tr', name: "smartphone" },
    { id: '1345fs-8978qw-9012ew-3456tr', name: "monitor" },
    { id: '1456fs-7890qw-9012ew-3456tr', name: "laptop" },
    { id: '1567fs-8901qw-9012ew-3456tr', name: "tablet" },
    { id: '1678fs-9012qw-9012ew-3456tr', name: "television" },
    { id: '1789fs-0123qw-9012ew-3456tr', name: "headphones" },
    { id: '1890fs-1234qw-9012ew-3456tr', name: "smartwatch" }, 
];

describe('CategoriesService', () => {
    let service: CategoriesService;
    let categoriesRepository: jest.Mocked<CategoriesRepository>;

    const mockCategoriesRepository = {
        getCategories: jest.fn(),
        loadCategories: jest.fn(),
        addCategory: jest.fn()
    } as unknown as jest.Mocked<CategoriesRepository>; 

    const mockJwtService = {
        sign: jest.fn(),
        verify: jest.fn(),
    };

    beforeEach( async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CategoriesService,
                {
                    provide: CategoriesRepository,
                    useValue: mockCategoriesRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        service = module.get<CategoriesService>(CategoriesService);
        categoriesRepository = module.get(CategoriesRepository);
    }); 

    it('CategoriesService debe existir', async () => {
        expect(service).toBeDefined();
    });

    it('getCategories debe devolver un array de categorias', async () => {
        const result:any = mockCategories;
        categoriesRepository.getCategories.mockResolvedValue(result);

        const categories = await service.getCategories();
        expect(categories).toEqual(result);
    });

    it('addCategory debe agregar una categoria', async () => {
        const result = {
            id: '6666fs-5678qw-9012ew-3456tr', 
            name: "home theater",
            products: [],
        };
        mockCategoriesRepository.addCategory.mockResolvedValue(result);

        const category = await service.addCategory(result);
        expect(category).toEqual(result);
        expect(mockCategoriesRepository.addCategory).toHaveBeenCalledWith(result);
    });
});