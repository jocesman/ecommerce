import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { CategoryDto } from "./dtos/Category.dto";

@Injectable()
export class CategoriesService {
    
    constructor(private readonly CategoriesRepository: CategoriesRepository) {} 

    getCategories(){
        return this.CategoriesRepository.getCategories();
    }

    loadCategories() {
        return this.CategoriesRepository.loadCategories();
    }

    addCategory(category: CategoryDto){
        return this.CategoriesRepository.addCategory(category);
    }

}