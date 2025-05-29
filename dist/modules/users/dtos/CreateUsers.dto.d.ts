import { Role } from '../../../roles.enum';
export declare class CreateUsersDto {
    name: string;
    country: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    role: Role;
    fecnac: Date;
}
