import { Users } from './users.entity';
import { OrderDetails } from "./orderDetails.entity";
export declare class Orders {
    id: string;
    createdAt: Date;
    orderDetails: OrderDetails;
    user: Users;
}
