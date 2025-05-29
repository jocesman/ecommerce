import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class OrderDetailDto {
  @IsUUID( '4', { message: 'El ID del producto debe ser válido, tipo UUID v4' })
  @IsNotEmpty( { message: 'El id del producto es obligatorio' })
  @ApiProperty({ 
    description: 'ID del producto que se desea agregar al pedido',
    example: '1234fs-5678qw-9012ew-3456tr',
    required: true,
  })
  productId: string;
}