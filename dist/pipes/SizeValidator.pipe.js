"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SizeValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
let SizeValidatorPipe = class SizeValidatorPipe {
    transform(value, metadata) {
        if (!value) {
            console.log('No se ha proporcionado un archivo de imagen');
            throw new common_1.BadRequestException('Debe adjuntar un archivo de imagen');
        }
        const minSize = 10480;
        const maxSize = 209600;
        if (value.size < minSize) {
            throw new common_1.BadRequestException('El archivo no puede tener un tamaño menor de 10kb');
        }
        else if (value.size > maxSize) {
            throw new common_1.BadRequestException('El archivo no puede tener un tamaño mayor de 200kb');
        }
        return value;
    }
};
exports.SizeValidatorPipe = SizeValidatorPipe;
exports.SizeValidatorPipe = SizeValidatorPipe = __decorate([
    (0, common_1.Injectable)()
], SizeValidatorPipe);
//# sourceMappingURL=SizeValidator.pipe.js.map