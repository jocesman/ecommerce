import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID, Length, Matches, Min } from "class-validator";

export class CreateProductsDto {

    @IsNotEmpty( { message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres de longitud' })
    @ApiProperty({ 
        description: 'Nombre del producto, debe tener entre 3 y 80 caracteres de longitud',
        example: 'iPhone 14 Pro',
        required: true,
    })
    name: string;

    @IsNotEmpty( { message: 'La descripción es obligatoria' })
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @Length(3, 100, { message: 'La descripción debe tener entre 3 y 100 caracteres de longitud' })
    @ApiProperty({ 
        description: 'Descripción del producto, debe tener entre 3 y 100 caracteres de longitud',
        example: 'iPhone 14 Pro, 64GB RAM, 128GB SSD, Teléfono móvil, Wi-Fi, Bluetooth, Código QR, Sin conexión',
        required: true,
    })
    description: string;

    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @Transform(({ value }) => {
        const num = parseFloat(value);
        if (isNaN(num)) return value;
        return num.toFixed(2); // retorna string con dos decimales
    })
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true }) // para validar como número
    @IsNumber({}, { message: 'El precio debe ser un número válido' })
    @Min(0.01, { message: 'El precio debe ser mayor a 0' })
    @ApiProperty({ 
        description: 'Precio del producto, debe ser un número válido y ser mayor a 0',
        example: '100.00',
        required: true,
    })
    price: string;
        
    @IsNotEmpty({ message: 'El Stock es obligatorio' })
    @Transform(({ value }) => {
        const num = parseFloat(value);
        if (isNaN(num)) return value;
        return num.toFixed(2); // retorna string con dos decimales
    })
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true }) // para validar como número
    @IsNumber({}, { message: 'El stock debe ser un número válido' })
    @Min(0.01, { message: 'El stock debe ser mayor a 0' })
    @ApiProperty({ 
        description: 'Stock del producto, debe ser un número válido y mayor a 0',
        example: '100.00',
        required: true,
    })
    stock: string;  
        
    @IsNotEmpty({ message: 'La categoria es obligatoria' })
    @IsString({ message: 'La categoria debe ser una cadena de texto' })
    @IsUUID('4', { message: 'La categoria debe ser válido, tipo UUID v4' })
    @ApiProperty({ 
        description: 'ID de la categoria del producto, debe ser válido y ser una cadena de texto',
        example: '1234fs-5678qw-9012ew-3456tr',
        required: true,
    })
    categoriesId: string;

    @IsUrl({},{ message: 'La imagen debe ser una URL válida' })
    @IsString({ message: 'La imagen debe ser una cadena de texto' })
    @IsOptional()
    @ApiProperty({ 
        description: 'URL de la imagen del producto, opcional',
        example: 'https://www.example.com/image.jpg',
    })
    imgUrl?: string;
        
}