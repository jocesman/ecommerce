import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "../../entities/products.entity";
import { Categories } from "../../entities/categories.entity";
import { Files } from "../../entities/files.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Products, Categories, Files])],
    providers: [ProductsService, ProductsRepository],
    controllers: [ProductsController],
})
export class ProductModule {}