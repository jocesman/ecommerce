import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { FilesRepository } from "./files.repository";
import { Products } from "../../entities/products.entity";
import { Files } from "../../entities/files.entity";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryConfig } from "../../config/cloudinary";


@Module({
    imports: [TypeOrmModule.forFeature([Products, Files])],
    providers: [FilesService, FilesRepository, CloudinaryService, CloudinaryConfig],
    controllers: [FilesController]
})
export class FilesModule {}