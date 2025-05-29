import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Users } from '../../../entities/users.entity';

export class LoginUserDto implements Partial<Users> {
    @IsNotEmpty({ message: 'El email es obligatorio' })
    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @ApiProperty({ 
        description: 'Correo electrónico del usuario, ej. john.doe@example.com',
        example: 'john.doe@example.com',
        required: true,
    })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @ApiProperty({ 
        description: 'Contraseña del usuario',
        required: true,
    })
    password: string;
}