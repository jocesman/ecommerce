import { CategoriesService } from "./categories.service";
import { CategoryDto } from "./dtos/Category.dto";
export declare class CategoriesController {
    private readonly CategoriesService;
    constructor(CategoriesService: CategoriesService);
    getCategories(): Promise<import("../../entities/categories.entity").Categories[]>;
    loadCategories(): Promise<void>;
    addCategory(category: CategoryDto): Promise<import("../../entities/categories.entity").Categories>;
}
