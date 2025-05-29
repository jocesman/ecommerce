import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, ParseUUIDPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dtos/CreateUsers.dto";
import { UpdateUsersDto } from "./dtos/UpdateUsers.dto";
import { AuthTokenGuard } from '../../guards/authToken.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorators';
import { Role } from '../../roles.enum';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('admin')
    @Roles(Role.Admin)
    @UseGuards(AuthTokenGuard, RolesGuard)
    @ApiExcludeEndpoint() // Oculta la ruta de Swagger
    getAdminUsers(){
        return 'Yo estoy en el admin, actúo como admin, trabajo en el admin pero no soy el admin';
    }

    @HttpCode(200)
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthTokenGuard, RolesGuard)
    @ApiBearerAuth() 
    @ApiOperation({ 
        summary: 'Obtiene el listado de usuarios',
        description: 'Obtiene un listado completo de los usuarios disponibles en el sistema. Solo accesible por administradores. Requiere autenticación.'
     }) 
    getUsers(){
        return this.usersService.getUsers();
    }

    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()  
    @ApiOperation({
        summary: 'Obtiene un usuario por su ID',
        description: 'Obtiene un usuario por su ID. Solo accesible por administradores. Requiere autenticación.'
    })
    getUsersById(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.getUsersById(id);
    }

    @HttpCode(201)
    @Post()
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Crea un nuevo usuario',
        description: 'Crea un nuevo usuario en el sistema. El usuario creado se almacena en la base de datos y puede ser autenticado posteriormente usando el endpoint de inicio de sesión. Los administradores pueden crear usuarios.'
    })
    createUser(@Body() user: CreateUsersDto){
        return this.usersService.createUser(user);
    }

    @HttpCode(200)
    @Put(':id')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()  
    @ApiOperation({
        summary: 'Actualiza un usuario por su ID',
        description: 'Actualiza un usuario por su ID. Solo accesible por administradores. Requiere autenticación.'
    })  
    updateUser(@Param('id') id: string, @Body() user: UpdateUsersDto){
        return this.usersService.updateUser(id, user);
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Elimina un usuario por su ID',
        description: 'Elimina un usuario por su ID. Solo accesible por administradores. Requiere autenticación.'
    })
    deleteUser(@Param('id', ParseUUIDPipe) id: string){
        return this.usersService.deleteUser(id); 
    }

}