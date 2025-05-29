import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dtos/CreateUsers.dto";
import { UpdateUsersDto } from "./dtos/UpdateUsers.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAdminUsers(): string;
    getUsers(): Promise<Omit<import("../../entities/users.entity").Users, "password">[]>;
    getUsersById(id: string): Promise<string | Omit<import("../../entities/users.entity").Users, "password">>;
    createUser(user: CreateUsersDto): Promise<string | Omit<CreateUsersDto, "password">>;
    updateUser(id: string, user: UpdateUsersDto): Promise<string>;
    deleteUser(id: string): Promise<string>;
}
