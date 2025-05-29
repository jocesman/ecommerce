import { Controller, Param, Post, UseInterceptors, UploadedFile, Get, ParseUUIDPipe, UsePipes, ParseFilePipe, FileTypeValidator, BadRequestException, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { SizeValidatorPipe } from "../../pipes/SizeValidator.pipe";
import { AuthTokenGuard } from "../../guards/authToken.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Files')
@Controller('files')
export class FilesController {

    constructor(private readonly filesService: FilesService) {}

    @Get()
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Obtiene el listado de archivos de Imagenes',
        description: 'Obtiene un listado de todos los archivos disponibles en el sistema.'
    })
    getFiles(){
        return this.filesService.getFiles();
    }

    @Get(':id')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Obtiene una imagen por su ID, y muestra el producto asociado',
        description: 'Obtiene una imagen por su ID, y muestra el producto asociado'
    })
    getFileById(@Param('id', ParseUUIDPipe) id: string){
        return this.filesService.getFileById(id);
    }

    @Post('uploadImage/:id')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Sube la imagen de un producto a través de su ID',
        description: 'Permite subir una imagen válida (jpg, jpeg, png, bmp, gif, webp, svg, ico) asociada a un producto mediante su ID. Incluye validación de tipo y tamaño del archivo.'
    })
    @ApiConsumes('multipart/form-data') // ← Necesario para carga de archivos
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
            description: 'Archivo de imagen que se desea subir. Formatos permitidos: jpg, jpeg, png, bmp, gif, webp, svg, ico',
            example: 'image.jpg',
          },
        },
      },
    })
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(SizeValidatorPipe) // Aplicamos el pipe de validación de tamaño
    async uploadImage(
      @Param('id', ParseUUIDPipe) id: string,
      @UploadedFile(
        new ParseFilePipe ({
          validators: [
            new FileTypeValidator ({ 
              fileType: 'image/*'//(jpg|jpeg|png|bmp|gif|webp|svg|ico)$/', 
            }),
          ],
          exceptionFactory: (errors) => {
            throw new BadRequestException('El archivo no es una imagen válida. Imagenes permitidas: jpg, jpeg, png, bmp, gif, webp, svg, ico');
          },
        })
      ) file: Express.Multer.File
      ) {
        
        return this.filesService.uploadImage(id, file);
      }

}