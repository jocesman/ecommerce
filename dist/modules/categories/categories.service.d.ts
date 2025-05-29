import { CategoriesRepository } from "./categories.repository";
import { CategoryDto } from "./dtos/Category.dto";
export declare class CategoriesService {
    private readonly CategoriesRepository;
    constructor(CategoriesRepository: CategoriesRepository);
    getCategories(): Promise<import("../../entities/categories.entity").Categories[]>;
    loadCategories(): Promise<void>;
    addCategory(category: CategoryDto): Promise<import("../../entities/categories.entity").Categories>;
}
