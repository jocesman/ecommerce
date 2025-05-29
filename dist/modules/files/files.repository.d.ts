import { BadRequestException } from "@nestjs/common";
import { Files } from "../../entities/files.entity";
import { Products } from "../../entities/products.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "./cloudinary.service";
export declare class FilesRepository {
    private readonly filesRepository;
    private readonly productsRepository;
    private readonly cloudinaryService;
    constructor(filesRepository: Repository<Files>, productsRepository: Repository<Products>, cloudinaryService: CloudinaryService);
    getFiles(): Promise<Files[]>;
    getFileById(id: string): Promise<Files | BadRequestException>;
    uploadImage(id: string, file: Express.Multer.File): Promise<string>;
}
