import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Files } from "../../entities/files.entity";
import { Products } from "../../entities/products.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "./cloudinary.service";
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesRepository {
    
    constructor(
        @InjectRepository(Files) private readonly filesRepository: Repository<Files>,
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async getFiles() {
        return await this.filesRepository.find({
            relations: ['products']
        });
    }

    async getFileById(id: string) {
        const file = await this.filesRepository.findOne(
            {
                where: {id},
                relations: ['products']
            });
        if (file) return file;
        return new BadRequestException('El archivo de imagen no existe');
    }

    async uploadImage(id: string, file: Express.Multer.File): Promise<string> {
        const product = await this.productsRepository.findOne({where: {id}, relations: ['categories']});
        if (!product) {
            throw new BadRequestException('El producto no existe');
        }

        const imagencargada = await this.cloudinaryService.uploadImage(file);
        console.log(imagencargada);
        
        if (!imagencargada) {
            throw new BadRequestException('Error al subir la imagen');
        }

        const newFile = new Files();
        newFile.id = uuid();
        newFile.filename = imagencargada.display_name;
        newFile.mimetype = `${imagencargada.resource_type}/${imagencargada.format}`;
        newFile.imgUrl = imagencargada.secure_url;
        
        // Relacionar con el producto
        newFile.products = [product];  // Asignamos el producto a la imagen
        if (!product.files) {
            product.files = [];
        }
        product.files.push(newFile);   // Agregamos la imagen al producto
        product.imgUrl = newFile.id;

        await this.filesRepository.save(newFile);
        await this.productsRepository.save(product);
    
        return "Imagen subida correctamente. Producto actualizado.";
    }
    
    // async upload(file: Express.Multer.File) {
        // const newFile = this.filesRepository.create({
        //   filename: file.originalname,
        //   mimetype: file.mimetype,
        //   data: file.buffer,
        // });
        //return await this.filesRepository.save(newFile);
    //   }



}