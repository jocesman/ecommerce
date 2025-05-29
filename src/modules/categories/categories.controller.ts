import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CategoryDto } from "./dtos/Category.dto";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthTokenGuard } from '../../guards/authToken.guard';
import { Roles } from '../../decorators/roles.decorators';
import { Role } from '../../roles.enum';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

    constructor(private readonly CategoriesService: CategoriesService) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthTokenGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Muetra el listado de categorías',
        description: 'Obtiene un listado completo de las categorías disponibles en el sistema. Solo accesible por usuarios con rol de administrador.'
    })
    getCategories(){
        return this.CategoriesService.getCategories();
    }

    @Get('seeder')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Hace una pre-carga de categorías en la base de datos ',
        description: 'Carga los datos de las categorías en el sistema. Solo accesible por usuarios con rol de administrador.'
    })
    loadCategories(){
        return this.CategoriesService.loadCategories();
    }

    @Post('addCategory')
    @Roles(Role.Admin)
    @UseGuards(AuthTokenGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Añade una nueva categoría',
        description: 'Añade una nueva categoría al sistema. Solo accesible por usuarios con rol de administrador.'
    })
    addCategory(@Body() category: CategoryDto){
        return this.CategoriesService.addCategory(category);
    }
}