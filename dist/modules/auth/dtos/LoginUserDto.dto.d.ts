import { Users } from '../../../entities/users.entity';
export declare class LoginUserDto implements Partial<Users> {
    email: string;
    password: string;
}
