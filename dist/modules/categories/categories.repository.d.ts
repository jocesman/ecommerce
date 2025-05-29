import { Categories } from '../../entities/categories.entity';
import { Repository } from "typeorm";
import { CategoryDto } from "./dtos/Category.dto";
export declare class CategoriesRepository {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    getCategories(): Promise<Categories[]>;
    loadCategories(): Promise<void>;
    addCategory(category: CategoryDto): Promise<Categories>;
}
