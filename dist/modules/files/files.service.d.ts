import { FilesRepository } from "./files.repository";
export declare class FilesService {
    private readonly filesRepository;
    saveFile: any;
    constructor(filesRepository: FilesRepository);
    getFiles(): Promise<import("../../entities/files.entity").Files[]>;
    getFileById(id: string): Promise<import("../../entities/files.entity").Files | import("@nestjs/common").BadRequestException>;
    uploadImage(id: string, file: Express.Multer.File): Promise<string>;
}
