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
exports.FilesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const files_service_1 = require("./files.service");
const SizeValidator_pipe_1 = require("../../pipes/SizeValidator.pipe");
const authToken_guard_1 = require("../../guards/authToken.guard");
const swagger_1 = require("@nestjs/swagger");
let FilesController = class FilesController {
    filesService;
    constructor(filesService) {
        this.filesService = filesService;
    }
    getFiles() {
        return this.filesService.getFiles();
    }
    getFileById(id) {
        return this.filesService.getFileById(id);
    }
    async uploadImage(id, file) {
        return this.filesService.uploadImage(id, file);
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene el listado de archivos de Imagenes',
        description: 'Obtiene un listado de todos los archivos disponibles en el sistema.'
    }),
    openapi.ApiResponse({ status: 200, type: [require("../../entities/files.entity").Files] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getFiles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene una imagen por su ID, y muestra el producto asociado',
        description: 'Obtiene una imagen por su ID, y muestra el producto asociado'
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getFileById", null);
__decorate([
    (0, common_1.Post)('uploadImage/:id'),
    (0, common_1.UseGuards)(authToken_guard_1.AuthTokenGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Sube la imagen de un producto a través de su ID',
        description: 'Permite subir una imagen válida (jpg, jpeg, png, bmp, gif, webp, svg, ico) asociada a un producto mediante su ID. Incluye validación de tipo y tamaño del archivo.'
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
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
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.UsePipes)(SizeValidator_pipe_1.SizeValidatorPipe),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({
                fileType: 'image/*'
            }),
        ],
        exceptionFactory: (errors) => {
            throw new common_1.BadRequestException('El archivo no es una imagen válida. Imagenes permitidas: jpg, jpeg, png, bmp, gif, webp, svg, ico');
        },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "uploadImage", null);
exports.FilesController = FilesController = __decorate([
    (0, swagger_1.ApiTags)('Files'),
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map