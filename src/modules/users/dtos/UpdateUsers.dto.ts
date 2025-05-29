import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  Length,
  IsEnum,
} from 'class-validator';
// import { Role } from 'src/roles.enum';
import { Role } from '../../../roles.enum';

export class UpdateUsersDto {
  // 🧑 Datos personales
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres de longitud' })
    name: string;
  
    @IsNotEmpty({ message: 'El país es obligatorio' })
    @IsString({ message: 'El país debe ser una cadena de texto' })
    @Length(3, 20, { message: 'El nombre del país debe tener entre 3 y 20 caracteres de longitud' })
    country: string;
  
    @IsNotEmpty({ message: 'La ciudad es obligatoria' })
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    @Length(3, 20, { message: 'El nombre de la ciudad debe tener entre 3 y 20 caracteres de longitud' })
    city: string;
  
    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres de longitud' })
    address: string;
  
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @Matches(/^\+?[0-9\s\-()]{7,20}$/, {
      message: 'El número de teléfono no tiene un formato válido, mínimo 7 caracteres, máximo 20 caracteres, ej. +57 310 123 4567, (031) 456-7890, 310-123-4567, 3112345678)',
    })
    phone: string;
  
    @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    email: string;

    @IsNotEmpty({ message: 'El rol es obligatorio' })
        @IsEnum(Role, { message: 'El rol debe ser uno de los siguientes: admin, user' })
        role: Role;

}
