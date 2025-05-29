import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Role } from '../roles.enum';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        length: 50
    })
    name: string;

    @Column({
        nullable: false,
        unique: true,
        length: 50
    })
    email: string;

    @Column({
        nullable: false,
        length: 255
    })
    password: string;

    @Column({
        nullable: false,
        length: 20
    })
    phone: string;

    @Column({
        nullable: false,
        length: 50,
      })
      country: string;

    @Column({
        nullable: false,
        length: 70,
    })
    address: string;

    @Column({
        nullable: false,
        length: 50,
    })
    city: string;

    @Column({
        nullable: false,
        length: 10,
        default: Role.User
    })
    role: Role;

    @OneToMany(() => Orders, (orders) => orders.user, { 
        cascade: ['remove'],
        onDelete: 'CASCADE', // Elimina todas las órdenes si se elimina el usuario
    })
      orders: Orders[];

    @Column({
        type: 'date',
        nullable: true,
    })
    fecnac: Date;

}