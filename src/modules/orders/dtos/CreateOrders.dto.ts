
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderDetailDto } from "./OrderDetailDto.dto";
import { ApiProperty } from "@nestjs/swagger";



export class CreateOrdersDto {
  @IsUUID('4', { message: 'El ID del usuario debe ser válido, tipo UUID v4' })
  @IsNotEmpty( { message: 'El id del usuario es obligatorio' })
  @ApiProperty({ 
    description: 'ID del usuario que realiza la orden',
    example: '1234fs-5678qw-9012ew-3456tr',
    required: true,
  })
  id: string;

  @IsArray({ message: 'OrderDetails debe ser un array' })
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'OrderDetails debe contener al menos un producto' })
  @Type(() => OrderDetailDto)
  @IsNotEmpty({ message: 'OrderDetails debe contener al menos un producto' })
  @ApiProperty({ 
    description: 'Array de detalles de la orden, mínimo un elemento',
    example: [
              {productId: '1234fs-5256qw-9012ew-3456tr'},
              {productId: '1567fs-5678qw-9259ew-3456tr'},
              {productId: '1890s-5678qw-9000ew-3456tr'},
            ],
    required: true,
  })
  orderDetails: OrderDetailDto[];
}
