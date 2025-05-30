"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_entity_1 = require("../../entities/categories.entity");
const typeorm_2 = require("typeorm");
const preLoaderData_1 = require("../../helpers/preLoaderData");
let CategoriesRepository = class CategoriesRepository {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async getCategories() {
        const categories = await this.categoriesRepository.find();
        return categories;
    }
    async loadCategories() {
        for (const cat of preLoaderData_1.loadData) {
            if (cat.category !== undefined) {
                if (!(await this.categoriesRepository.findOne({ where: { name: convertirCapital(cat.category) } }))) {
                    const category = new categories_entity_1.Categories();
                    category.name = convertirCapital(cat.category);
                    await this.categoriesRepository.save(category);
                }
            }
        }
    }
    async addCategory(category) {
        const newCategory = new categories_entity_1.Categories();
        category.name = convertirCapital(category.name);
        const existe = await this.categoriesRepository.findOne({
            where: { name: category.name }
        });
        if (existe) {
            throw new common_1.BadRequestException('La categoría ya existe');
        }
        newCategory.name = category.name;
        await this.categoriesRepository.save(newCategory);
        return newCategory;
    }
};
exports.CategoriesRepository = CategoriesRepository;
exports.CategoriesRepository = CategoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesRepository);
const convertirCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
//# sourceMappingURL=categories.repository.js.map