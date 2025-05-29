import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CategoryProduct {
    @IsNotEmpty({ message: 'La categoria es obligatoria' })
    @IsString({ message: 'La categoria debe ser una cadena de texto' })
    @IsUUID('4', { message: 'La categoria debe ser válido, tipo UUID v4' })
    categoriesId: string;
}
