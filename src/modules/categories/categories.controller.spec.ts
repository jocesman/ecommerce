import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { CategoryDto } from "./dtos/Category.dto";
import { Categories } from "../../entities/categories.entity";

const mockCategory: CategoryDto = {
    name: 'Smartphone'
};

describe ('CategoriesController', () => {

    let categoriesController: CategoriesController;
    let mockCategoriesService: CategoriesService;

    beforeEach( async () => {
        
        mockCategoriesService = {
            getCategories: () => Promise.resolve([] as Categories[]),
            addCategory: ( category: CategoryDto) => Promise.resolve({ ...category, id: '1234fs-5678qw-9012ew-3456tr' } as Categories), 
        } as unknown as jest.Mocked<CategoriesService>;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriesController],
            providers: [
                CategoriesService,
                {
                    provide: CategoriesService,
                    useValue: mockCategoriesService,
                },
            ],
        }).compile();

        categoriesController = module.get<CategoriesController>(CategoriesController);
      
    });

    it('Debe estar definido', () => {
        expect(categoriesController).toBeDefined();
    });

    it('Debe devolver un array de categorias', async () => {
        const result = await categoriesController.getCategories();
        expect(result).toEqual([]);
    });

    it('Debe agregar una categoria', async () => {
        const result = await categoriesController.addCategory(mockCategory);
        expect(result).toEqual({ ...mockCategory, id: '1234fs-5678qw-9012ew-3456tr' });
    });

});

