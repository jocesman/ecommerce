import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity('files')
export class Files {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    filename: string;

    @Column({
        type: 'varchar',
        nullable: false,
      })
    mimetype: string;

    @Column({
        type: 'string',
        nullable: false,
    }) // tipo binario para PostgreSQL
    data: string;

    @ManyToMany(() => Products, (product) => product.files)
    products: Products[];

}