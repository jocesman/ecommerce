import { IsDecimal, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Categories } from "./categories.entity";
import { Files } from "./files.entity";

@Entity('products')
export class Products {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsNotEmpty()
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;
    
    @Column({ type: 'varchar', length: 100, nullable: false })
    description: string;

    @IsNotEmpty()
    @IsDecimal()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: string;
    
    @IsNotEmpty()
    @IsDecimal()
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    stock: string;  

    @Column({ type: 'varchar', length: 255, nullable: true })
    imgUrl: string;

    // Relación MANY-TO-MANY con Files (varias imágenes por producto) 
    @ManyToMany(() => Files, (file) => file.products, { 
        cascade: true 
    })
    @JoinTable({
        name: 'product_files',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' },
    })
    files: Files[];

    @ManyToOne(() => Categories, (categories) => categories.products, {
        onDelete: 'SET NULL',
        nullable: true
    })
    categories: Categories;
    
    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    @JoinTable({
        name: 'product_order_details',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
    })
    orderDetails: OrderDetails[]; 
      
}