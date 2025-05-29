import { Orders } from "./orders.entity";
import { Role } from '../roles.enum';
export declare class Users {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    role: Role;
    orders: Orders[];
    fecnac: Date;
}
