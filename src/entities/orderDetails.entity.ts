import { IsDecimal, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "./products.entity";


@Entity('orderDetails')
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @IsDecimal()
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        default: '0.00'
    })
    price: string;    

    @OneToOne(() => Orders, {
        nullable: true,
        onDelete: 'CASCADE', // Si se elimina un pedido, se elimina el detalle relacionado
    })
    @JoinColumn()
    orders: Orders; 

    @ManyToMany(() => Products, (products) => products.orderDetails, {
        cascade: true,
      })
      products: Products[];
    
}