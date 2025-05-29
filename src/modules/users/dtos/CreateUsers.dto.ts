import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsStrongPassword,
    Matches,
    Length,
    IsEnum,
  } from 'class-validator';
// import { Role } from 'src/roles.enum';
import { Role } from '../../../roles.enum';
import { ApiProperty } from '@nestjs/swagger';

  
  export class CreateUsersDto {
    // 🧑 Datos personales
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres de longitud' })
    @ApiProperty({ 
        description: 'Nombre del usuario, debe tener entre 3 y 80 caracteres de longitud',
        example: 'Juan Perez',
        required: true,
    })
    name: string;
  
    @IsNotEmpty({ message: 'El país es obligatorio' })
    @IsString({ message: 'El país debe ser una cadena de texto' })
    @Length(3, 20, { message: 'El nombre del país debe tener entre 3 y 20 caracteres de longitud' })
    @ApiProperty({ 
        description: 'País del usuario, debe tener entre 3 y 20 caracteres de longitud',
        example: 'Argentina',
        required: true,
    })
    country: string;
  
    @IsNotEmpty({ message: 'La ciudad es obligatoria' })
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    @Length(3, 20, { message: 'El nombre de la ciudad debe tener entre 3 y 20 caracteres de longitud' })
    @ApiProperty({ 
        description: 'Ciudad del usuario, debe tener entre 3 y 20 caracteres de longitud',
        example: 'Buenos Aires',
        required: true,
    })
    city: string;
  
    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres de longitud' })
    @ApiProperty({ 
        description: 'Dirección del usuario, debe tener entre 3 y 80 caracteres de longitud',
        example: 'Av. Juan Perez 1234',
        required: true,
    })
    address: string;
  
    // ☎️ Contacto
    // ✅ Ejemplos válidos:
    // +57 310 123 4567
    // (031) 456-7890
    // 310-123-4567
    // 3112345678
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
      message: 'El número de teléfono no tiene un formato válido, mínimo 7 caracteres, máximo 20 caracteres, ej. +57 310 123 4567, (031) 456-7890, 310-123-4567, 3112345678)',
    })
    @ApiProperty({ 
        description: 'Teléfono del usuario, debe tener entre 7 y 20 caracteres de longitud, ej. +57 310 123 4567, (031) 456-7890, 310-123-4567, 3112345678',
        example: '+57 310 123 4567',
        required: true,
    })
    phone: string;
  
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @ApiProperty({ 
        description: 'Correo electrónico del usuario',
        example: 'john.doe@example.com',
        required: true,
    })
    email: string;
  
    // 🔐 Acceso
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsStrongPassword(
      {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      {
        message:
          'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y debe contener al menos uno de los siguientes símbolos: !@#$%^&*',
      },
    )
    @Length(8, 15, { message: 'La contraseña debe tener entre 8 y 15 caracteres de longitud' })
    @Matches(/[!@#$%^&*]/, {
        message: 'La contraseña debe contener al menos uno de los siguientes símbolos: !@#$%^&*',
    })
    @ApiProperty({ 
        description: 'Contraseña del usuario, debe tener entre 8 y 15 caracteres de longitud,\n incluyendo mayúsculas, minúsculas, números y debe contener al menos uno de los siguientes símbolos: !@#$%^&*\n\n',
        example: 'Asdf1234%',
        required: true,
    })
    password: string;

    @IsNotEmpty({ message: 'El rol es obligatorio' })
    @IsEnum(Role, { message: 'El rol debe ser uno de los siguientes: admin, user' })
    @ApiProperty({ 
        description: 'Rol del usuario, debe ser uno de los siguientes: admin, user: por defecto es user',
        example: 'admin',
        required: true,
    })
    role: Role = Role.User;;

    @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
    fecnac: Date;

  }
