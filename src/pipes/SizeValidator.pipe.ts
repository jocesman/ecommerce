import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class SizeValidatorPipe implements PipeTransform<any, any> {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!value) {
            console.log('No se ha proporcionado un archivo de imagen');
            throw new BadRequestException   ('Debe adjuntar un archivo de imagen');
        }

        const minSize = 10480; 
        const maxSize = 209600;
        if (value.size < minSize) {
            throw new BadRequestException   ('El archivo no puede tener un tamaño menor de 10kb');
        } else if (value.size > maxSize) {
            throw new BadRequestException   ('El archivo no puede tener un tamaño mayor de 200kb');
        }
        return value;
    }
}