import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users} from './users.entity';
import { OrderDetails } from "./orderDetails.entity";

@Entity('orders')
export class Orders {

    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @OneToOne(() => OrderDetails, { 
      cascade: true,
      onDelete: 'CASCADE', // Eliminar detalles si se elimina la orden
    })
    @JoinColumn()
    orderDetails: OrderDetails;

    @ManyToOne(() => Users, (user) => user.orders, {
      nullable: true,
      onDelete: 'CASCADE', // Si se elimina el usuario, se eliminan sus órdenes
    })
    user: Users;

}