import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CategoryDto {

    @IsNotEmpty({ message: 'La categoria es obligatoria' })
    @IsString({ message: 'La categoria debe ser una cadena de texto' })
    @Length(3, 15, { message: 'La categoria debe tener entre 3 y 15 caracteres de longitud' })
    @ApiProperty({ 
        description: 'Nombre de la categoria, debe tener entre 3 y 15 caracteres de longitud',
        example: 'Electronics',
        required: true,
    })
    name: string;

}