import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Products } from './products.entity';
  
  @Entity('categories')
  export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'varchar',
      length: 50,
      nullable: false,
    })
    name: string;
  
    @OneToMany(() => Products, (product) => product.categories, {
      cascade: true, // Esto permite operaciones en cascada desde Category hacia Products
      onDelete: 'CASCADE', // Elimina los productos relacionados si se elimina la categoría
    })
    products: Products[];
  }
  


// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
// import { v4 as uuid } from 'uuid';
// import { Products } from "./products.entity";

// @Entity('categories')
// export class Categories {

//     @PrimaryGeneratedColumn('uuid')
//     id: string;    

//     @Column({
//         nullable: false, 
//         length: 50
//     })
//     name: string;

//     @OneToMany(() => Products, (products) => products.categories)
//     products: Products[];

// }