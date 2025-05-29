import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dtos/LoginUserDto.dto";
import { CreateUsersDto } from "../users/dtos/CreateUsers.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService
    ) {}
    
    @Post('signup')
    @ApiOperation({
        summary: 'Registra un nuevo usuario en el sistema',
        description: `Este endpoint permite crear un nuevo usuario proporcionando la información necesaria.
        El usuario creado se almacena en la base de datos y puede ser autenticado posteriormente usando el endpoint de inicio de sesión.`,
    })
    @ApiBody({
        description: 'Datos necesarios para crear un nuevo usuario',
        type: CreateUsersDto
    })
    async createUser(@Body() user: CreateUsersDto) {
        return this.authService.createUser(user);
    }

    @Post('signin')
    @ApiOperation({ 
        summary: 'Inicia sesión y se obtiene un token de acceso',
        description: `Este endpoint valida las credenciales del usuario (correo electrónico y contraseña).
        Si son correctas, retorna un token JWT que deberá ser usado en los encabezados para acceder a rutas protegidas.`,
    })
    authUser(@Body() credentials : LoginUserDto){
        return this.authService.authUser(credentials);
    }
}