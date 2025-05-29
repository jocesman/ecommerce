import { Repository } from "typeorm";
import { Users } from "../../entities/users.entity";
import { CreateUsersDto } from "./dtos/CreateUsers.dto";
import { UpdateUsersDto } from "./dtos/UpdateUsers.dto";
export declare class UsersRepository {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    getUsers(): Promise<Omit<Users, "password">[]>;
    getUsersById(id: string): Promise<string | Omit<Users, 'password'>>;
    createUser(users: CreateUsersDto): Promise<string | Omit<CreateUsersDto, "password">>;
    updateUser(id: string, user: UpdateUsersDto): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
