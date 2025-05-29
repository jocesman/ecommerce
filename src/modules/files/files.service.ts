import { Injectable } from "@nestjs/common";
import { FilesRepository } from "./files.repository";

@Injectable()   
export class FilesService {
    
    saveFile: any;
    
    constructor(private readonly filesRepository: FilesRepository) {}
    
    getFiles() {
        return this.filesRepository.getFiles();
    } 
    
    getFileById(id: string) {
        return this.filesRepository.getFileById(id);
    }
    
    
    uploadImage(id: string, file: Express.Multer.File) {
        return this.filesRepository.uploadImage(id, file);
    }
    
    // upload(file: Express.Multer.File) {
    //     return this.filesRepository.upload(file);
    // }

}