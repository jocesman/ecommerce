import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from '../../entities/categories.entity';
import { Repository } from "typeorm";
import { CategoryDto } from "./dtos/Category.dto";
import { loadData } from '../../helpers/preLoaderData';
@Injectable()
export class CategoriesRepository {

    constructor(
        @InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>
    ) {}
    
    async getCategories(){
        const categories = await this.categoriesRepository.find();
        return categories;
    }
    
    async loadCategories() {

        for (const cat of loadData) {
            if (cat.category !== undefined) {
                if (!(await this.categoriesRepository.findOne({where: { name: convertirCapital(cat.category)}}))) {
                    const category = new Categories();
                    category.name = convertirCapital(cat.category);
                    await this.categoriesRepository.save(category);
                }
            }
        }
    }

    
    async addCategory(category: CategoryDto): Promise<Categories> {
        const newCategory: Categories = new Categories();
        category.name = convertirCapital(category.name);
        const existe = await this.categoriesRepository.findOne({
            where: { name: category.name }
        });
        if (existe) {
            throw new BadRequestException('La categoría ya existe');
        }
        newCategory.name = category.name;
        await this.categoriesRepository.save(newCategory);
        return newCategory;
    }

}

const convertirCapital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}