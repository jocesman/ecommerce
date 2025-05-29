import { BadRequestException } from "@nestjs/common";
import { FilesService } from "./files.service";
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    getFiles(): Promise<import("../../entities/files.entity").Files[]>;
    getFileById(id: string): Promise<import("../../entities/files.entity").Files | BadRequestException>;
    uploadImage(id: string, file: Express.Multer.File): Promise<string>;
}
