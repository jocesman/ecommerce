import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "../../guards/auth.guard";
import { CreateProductsDto } from "./dtos/CreateProducts.dto";
import { AuthTokenGuard } from "../../guards/authToken.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { Roles } from "../../decorators/roles.decorators";
import { Role } from "../../roles.enum";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";


@ApiTags('Products')
@Controller('products') 
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @HttpCode(200) 
    @Get()
    @ApiOperation({
        summary: 'Obtiene el listado de productos',
        description: 'Obtiene un listado completo de los productos disponibles en el sistema. Cualquier usuario puede consultar este endpoint. No requiere autenticación.'
    })
    getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 5
    ){
        // Convertir a números y aplicar valores por defecto
        page = page ? parseInt(page.toString()) : 1;
        limit = limit ? parseInt(limit.toString()) : 5;
        
        return this.productsService.getProducts(page, limit);
    }

    @HttpCode(201)
    @Get('seeder')
    @UseGuards(AuthTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Hace una pre-carga de productos en la base de datos',
        description: 'Carga los datos de productos en la base de datos. Solo accesible por administradores.'
    })
    loadProduct(){ 
        return this.productsService.loadProduct();
    }

    @HttpCode(200)
    @Get(':id')
    @ApiOperation({
        summary: 'Obtiene un producto por su ID',
        description: 'Obtiene un producto por su ID. Cualquier usuario puede consultar este endpoint. No requiere autenticación.'
    })
    getProductsById(@Param('id', ParseUUIDPipe) id: string){
        return this.productsService.getProductsById(id);
    }

    @HttpCode(201)
    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthTokenGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Crea un nuevo producto',
        description: 'Crea un nuevo producto en el sistema. Solo accesible por administradores.'
    })
    createProduct(@Body() product: CreateProductsDto){
        return this.productsService.createProduct(product);
    }

    @HttpCode(200)
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthTokenGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Elimina un producto por su ID',
        description: 'Elimina un producto por su ID. Solo accesible por administradores.'
    })
    deleteProduct(@Param('id', ParseUUIDPipe) id: string){
        return this.productsService.deleteProduct(id);
    }

    @HttpCode(200)
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthTokenGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Actualiza un producto por su ID',
        description: 'Actualiza un producto por su ID. Solo accesible por administradores.'
    })
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: CreateProductsDto){
        return this.productsService.updateProduct(id, product);
    }

}